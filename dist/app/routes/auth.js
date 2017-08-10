"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const commonConfig = require("node-services-common-code");
const config = commonConfig.envConfig;
const logger = commonConfig.logger;
const db_1 = require("../../db/db");
const common = require("../utils/common");
const hash = require("../utils/hashp");
let atob = require('atob');
let btoa = require('btoa');
let router = express.Router();
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = yield common.receiveBody(req);
    const key = body.e;
    const email = atob(atob(key).split('??')[0]);
    const pass = atob(atob(key).split('??')[1]);
    let qry = 'SELECT username, email, password, role FROM `users` WHERE ?';
    let row = {
        email: email,
    };
    db_1.poolScoreboard.query(qry, row, (err, rows) => {
        if (err) {
            res.json({ response: 'user not found!' });
        }
        if (!err) {
            if (!rows.length) {
                res.json({ response: 'user not found!' });
            }
            const verified = hash.verivy(pass, rows[0].password);
            if (verified) {
                if (rows[0].role === 'admin') {
                    const roleKey = btoa(atob(key) + '//admin');
                    res.json({ response: roleKey });
                }
                else {
                    const roleKey = btoa(atob(key) + '//' + rows[0].username);
                    res.json({ response: roleKey });
                }
            }
            else {
                res.json({ response: 'email and password do not match!' });
            }
        }
        else {
            res.json({ response: 'failed to get user' });
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
exports.default = router;
//# sourceMappingURL=auth.js.map