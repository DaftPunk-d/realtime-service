'use strict';


import * as _ from 'lodash';
let mysql = require('mysql');
import * as common from 'node-services-common-code';
const config = common.envConfig;

let poolScoreboard = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  connectionLimit: 10,
  acquireTimeout: 10000
});

export { poolScoreboard };



  // poolScoreboard.query(qry, [values.label, slug, values.user_id], (err: any, result: any) => {
  //   if (err) return callback(err);
  //   else return callback(null, result.insertId);
  // });




export function editFeed(feed: any, callback: (err: any, insertId?: number) => void) {

  let user_id = feed.user_id
    ? feed.user_id
    : null;

  if (!_.isNumber(user_id)) {
    return callback('wrong user_id');
  }

  if (!feed.label)
    return callback('parameter not found: label');

  let qry = 'UPDATE `social_feeds` SET ? WHERE social_feeds_id = ?';


  let row = {
    label: feed.label,
    user_id: feed.user_id
  };

  poolScoreboard.query(qry, [row, feed.feed_id], (err: any, result: any) => {
    if (err) return callback(err);
    else return callback(null, result.insertId);
  });

}

export function deleteFeed(feedid: string, callback: (err: any) => void) {

  if (!feedid)
    return callback('parameter not found: feedid');

  let qry = 'DELETE FROM social_feeds WHERE social_feeds_id = ?';

  poolScoreboard.query(qry, [feedid], (err: any) => {
    if (err) return callback(err);
    else return callback(null);
  });
}




export function getCategories(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const qry = `SELECT id, name FROM scoreboard.categories;`;
    poolScoreboard.query(qry, (err: any, results?: any[]) => {
      if (err) {
        reject(err);
      } else {
        if (results.length > 0) {
          resolve(results);
        } else {
          reject(`Could not get categories from the database`);
        }
      }
    });
  });
}

export function getAllQuestions(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const qry = `SELECT id, question, categoryId FROM scoreboard.questions;`;
    poolScoreboard.query(qry, (err: any, results?: any[]) => {
      if (err) {
        reject(err);
      } else {
        if (results.length > 0) {
          resolve(results);
        } else {
          reject(`Could not get questions from the database`);
        }
      }
    });
  });
}

export function getAllAnswers(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const qry = `SELECT id, questionId, answer, isCorrect FROM scoreboard.answers;`;
    poolScoreboard.query(qry, (err: any, results?: any[]) => {
      if (err) {
        reject(err);
      } else {
        if (results.length > 0) {
          resolve(results);
        } else {
          reject(`Could not get answers from the database`);
        }
      }
    });
  });
}

export function getQuestionsByCategoryId(categoryId: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const qry = `SELECT id, question FROM scoreboard.questions WHERE categoryId=?;`;
    poolScoreboard.query(qry, categoryId, (err: any, results?: any[]) => {
      if (err) {
        reject(err);
      } else {
        if (results.length > 0) {
          resolve(results);
        } else if (!results.length){
          resolve(null);
        } else {
          reject(`Could not get questions from the database`);
        }
      }
    });
  });
}

export function getAnswersByQuestionId(questionId: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const qry = `SELECT id, answer, isCorrect FROM scoreboard.answers WHERE questionId=?;`;
    poolScoreboard.query(qry, questionId, (err: any, results?: any[]) => {
      if (err) {
        reject(err);
      } else {
        if (results.length > 0) {
          resolve(results);
        } else if (!results.length){
          resolve(null);
        } else {
          reject(`Could not get answers from the database`);
        }
      }
    });
  });
}
