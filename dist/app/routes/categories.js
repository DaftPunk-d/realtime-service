"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const db = require("../../db/db");
const commonConfig = require("node-services-common-code");
const config = commonConfig.envConfig;
const logger = commonConfig.logger;
const db_1 = require("../../db/db");
const common = require("../utils/common");
let router = express.Router();
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger.info('getting categories...');
    let categories = yield db.getCategories();
    res.json(categories);
}));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const category = yield common.receiveBody(req);
    let qry = 'INSERT INTO `categories` SET ?';
    let row = {
        name: category.cat
    };
    db_1.poolScoreboard.query(qry, row, (err) => {
        if (!err) {
            res.json({ response: 'success' });
        }
        else {
            res.json({ response: 'failed to add category' });
        }
    });
}));
router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const categoryId = req.params.id;
    let qry = 'DELETE FROM `categories` WHERE id=?';
    db_1.poolScoreboard.query(qry, categoryId, (err, rows) => {
        if (!err) {
            res.json({ response: 'success' });
        }
        else {
            res.json({ response: 'failed to delete category' });
        }
    });
}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=categories.js.map