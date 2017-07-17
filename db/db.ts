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

export interface ITableData {

  count: number;
  columns: string[];
  rows: any[];
}

export function getFeedInfo(feedId: string, callback: Function) {
  let query = 'SELECT social_query_id AS query_id, social_feeds_id AS feed_id, \
               label, slug, networks.name AS network, uid, options, authorization, status, last_refresh \
               FROM social_feeds \
               LEFT JOIN social_queries ON social_feeds.social_feeds_id = social_queries.social_feed_id \
               LEFT JOIN networks ON networks.network_id = social_queries.network_id \
               WHERE social_feeds_id = ?';

  poolScoreboard.query(query, [feedId], callback);
}

export function create(values: any, callback: (err: any, insertId?: number) => void) {

  if (!values.user_id)
    return callback('parameter not found: user_id');

  if (!values.label)
    return callback('parameter not found: label');

  let qry = 'INSERT INTO social_feeds(label, slug, user_id) VALUES(?, ?, ?)';

  // poolScoreboard.query(qry, [values.label, slug, values.user_id], (err: any, result: any) => {
  //   if (err) return callback(err);
  //   else return callback(null, result.insertId);
  // });

}


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

// Cascade delete should be defined by the MySQL foreign key constraints
export function deleteFeed(feedid: string, callback: (err: any) => void) {

  if (!feedid)
    return callback('parameter not found: feedid');

  let qry = 'DELETE FROM social_feeds WHERE social_feeds_id = ?';

  poolScoreboard.query(qry, [feedid], (err: any) => {
    if (err) return callback(err);
    else return callback(null);
  });
}

    // 2. check if user is owner of the feed
    // function isOwner(userId: number, callback: (err: any, authInfo: any) => void) {
    //   if (!userId || isNaN(userId))
    //     return callback(null, {userid: userId, authorized: false});
    //
    //   // instantly resolve to true when no feedId is given, this means the user
    //   // is a valid user, but not an owner of anything (yet)
    //   if (!feedIdNumber) return callback(null, {userid: userId, authorized: true});
    //
    //   let qry = 'SELECT `social_feeds_id` FROM `social_feeds` \
    //       WHERE user_id = ?';
    //
    //   poolScoreboard.query(qry, [userId], (err: any, rows: any[]) => {
    //     if (err) throw err;
    //
    //     let feeds = _.chain(rows).map('social_feeds_id').flatten().value();
    //     let isOwner = _.includes(feeds, feedIdNumber);
    //
    //     callback(null, {
    //       userid: userId,
    //       authorized: isOwner
    //     });
    //   });
    // }




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
//
// export function getNetwork(name: string): Promise<INetwork> {
//   return new Promise((resolve, reject) => {
//     const qry = `SELECT network_id as id, name FROM feeds.networks WHERE name=?;`;
//     poolScoreboard.query(qry, [name], (err: any, result?: any) => {
//       if (err) {
//         reject(err);
//       } else {
//         if (result.length > 0) {
//           resolve(result);
//         } else {
//           reject(`Could not get single network from the database`);
//         }
//       }
//     });
//   });
// }
//
// export function getFeedByUserId(userId: string, feedId: string): Promise<IFeedInfo[]> {
//   return new Promise((resolve, reject) => {
//     const qry = `SELECT
//     social_feeds.social_feeds_id AS feed_id,
//     social_feeds.label,
//     social_feeds.slug,
//     social_feeds.curation,
//     social_queries.social_query_id,
//     social_queries.uid,
//     social_queries.authorization,
//     social_queries.options,
//     social_queries.status,
//     social_queries.last_refresh,
//     networks.name AS network
//     FROM
//     social_feeds
//     LEFT JOIN social_queries ON social_queries.social_feed_id = social_feeds.social_feeds_id
//     LEFT JOIN networks ON social_queries.network_id = networks.network_id
//     WHERE
//     social_feeds.user_id = ? AND social_feeds.social_feeds_id = ?`;
//     poolScoreboard.query(qry, [userId, feedId], (err: any, results?: any[]) => {
//       if (err) {
//         reject(err);
//       } else {
//         if (results.length > 0) {
//           resolve(results);
//         } else {
//           reject(`Could not find feed for user: ${userId} & feed id: ${feedId} in the database`);
//         }
//       }
//     });
//   });
// }
