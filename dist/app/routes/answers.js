"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const _ = require("lodash");
const express = require("express");
const db = require("../../db/db");
const commonConfig = require("node-services-common-code");
const config = commonConfig.envConfig;
const logger = commonConfig.logger;
const db_1 = require("../../db/db");
const common = require("../utils/common");
let router = express.Router();
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger.info('getting anwsers...');
    let answers;
    let questionId = parseInt(req.query.questionId);
    if (_.isNumber(questionId)) {
        answers = yield db.getAnswersByQuestionId(questionId);
    }
    else {
        answers = yield db.getAllAnswers();
    }
    res.json(answers);
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const answers = yield common.receiveBody(req);
    let qry = 'INSERT INTO `answers` SET ?';
    let row = {
        answer: answers.a,
        questionId: answers.id,
        isCorrect: answers.correct
    };
    db_1.poolScoreboard.query(qry, row, (err, rows) => {
        if (!err) {
            res.json({ response: 'success' });
        }
        else {
            res.json({ response: 'failed to add answer' });
        }
    });
}));
router.put('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const answers = yield common.receiveBody(req);
    let qry = 'UPDATE `answers` SET ? WHERE answers.id=?';
    let row = {
        answer: answers.a,
        questionId: answers.id,
        isCorrect: answers.correct
    };
    db_1.poolScoreboard.query(qry, [row, parseInt(answers.answerId)], (err, rows) => {
        if (!err) {
            res.json({ response: 'success' });
        }
        else {
            res.json({ response: 'failed to add answer' });
        }
    });
}));
router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const answerId = req.params.id;
    let qry = 'DELETE FROM `answers` WHERE ?';
    let row = {
        id: answerId,
    };
    db_1.poolScoreboard.query(qry, row, (err, rows) => {
        if (!err) {
            res.json({ response: 'success' });
        }
        else {
            res.json({ response: 'failed to delete answer' });
        }
    });
}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=answers.js.map