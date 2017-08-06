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
    logger.info('getting questions...');
    let questions;
    let categoryId = parseInt(req.query.categoryId);
    if (_.isNumber(categoryId)) {
        questions = yield db.getQuestionsByCategoryId(categoryId);
    }
    else {
        questions = yield db.getAllQuestions();
    }
    res.json(questions);
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const question = yield common.receiveBody(req);
    let qry = 'INSERT INTO `questions` SET ?';
    let row = {
        question: question.q,
        categoryId: question.categoryId
    };
    db_1.poolScoreboard.query(qry, row, (err, rows) => {
        if (!err) {
            res.json({ response: 'success' });
        }
        else {
            res.json({ response: 'failed to add question' });
        }
    });
}));
router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const questionId = req.params.id;
    let qry = 'DELETE FROM `questions` WHERE ?';
    let row = {
        id: questionId,
    };
    db_1.poolScoreboard.query(qry, row, (err, rows) => {
        if (!err) {
            res.json({ response: 'success' });
        }
        else {
            res.json({ response: 'failed to delete question' });
        }
    });
}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=questions.js.map