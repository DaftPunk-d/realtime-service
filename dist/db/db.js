'use strict';
const _ = require("lodash");
let mysql = require('mysql');
const common = require("node-services-common-code");
const config = common.envConfig;
let poolScoreboard = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    connectionLimit: 10,
    acquireTimeout: 10000
});
exports.poolScoreboard = poolScoreboard;
function editFeed(feed, callback) {
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
    poolScoreboard.query(qry, [row, feed.feed_id], (err, result) => {
        if (err)
            return callback(err);
        else
            return callback(null, result.insertId);
    });
}
exports.editFeed = editFeed;
function deleteFeed(feedid, callback) {
    if (!feedid)
        return callback('parameter not found: feedid');
    let qry = 'DELETE FROM social_feeds WHERE social_feeds_id = ?';
    poolScoreboard.query(qry, [feedid], (err) => {
        if (err)
            return callback(err);
        else
            return callback(null);
    });
}
exports.deleteFeed = deleteFeed;
function getCategories() {
    return new Promise((resolve, reject) => {
        const qry = `SELECT id, name FROM scoreboard.categories;`;
        poolScoreboard.query(qry, (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                if (results.length > 0) {
                    resolve(results);
                }
                else {
                    reject(`Could not get categories from the database`);
                }
            }
        });
    });
}
exports.getCategories = getCategories;
function getAllQuestions() {
    return new Promise((resolve, reject) => {
        const qry = `SELECT id, question, categoryId FROM scoreboard.questions;`;
        poolScoreboard.query(qry, (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                if (results.length > 0) {
                    resolve(results);
                }
                else {
                    reject(`Could not get questions from the database`);
                }
            }
        });
    });
}
exports.getAllQuestions = getAllQuestions;
function getAllAnswers() {
    return new Promise((resolve, reject) => {
        const qry = `SELECT id, questionId, answer, isCorrect FROM scoreboard.answers;`;
        poolScoreboard.query(qry, (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                if (results.length > 0) {
                    resolve(results);
                }
                else {
                    reject(`Could not get answers from the database`);
                }
            }
        });
    });
}
exports.getAllAnswers = getAllAnswers;
function getQuestionsByCategoryId(categoryId) {
    return new Promise((resolve, reject) => {
        const qry = `SELECT id, question FROM scoreboard.questions WHERE categoryId=?;`;
        poolScoreboard.query(qry, categoryId, (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                if (results.length > 0) {
                    resolve(results);
                }
                else if (!results.length) {
                    resolve(null);
                }
                else {
                    reject(`Could not get questions from the database`);
                }
            }
        });
    });
}
exports.getQuestionsByCategoryId = getQuestionsByCategoryId;
function getAnswersByQuestionId(questionId) {
    return new Promise((resolve, reject) => {
        const qry = `SELECT id, answer, isCorrect FROM scoreboard.answers WHERE questionId=?;`;
        poolScoreboard.query(qry, questionId, (err, results) => {
            if (err) {
                reject(err);
            }
            else {
                if (results.length > 0) {
                    resolve(results);
                }
                else if (!results.length) {
                    resolve(null);
                }
                else {
                    reject(`Could not get answers from the database`);
                }
            }
        });
    });
}
exports.getAnswersByQuestionId = getAnswersByQuestionId;
//# sourceMappingURL=db.js.map