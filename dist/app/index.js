"use strict";
const express = require("express");
const categories_1 = require("./routes/categories");
const questions_1 = require("./routes/questions");
const answers_1 = require("./routes/answers");
const register_1 = require("./routes/register");
const auth_1 = require("./routes/auth");
const common = require("node-services-common-code");
const config = common.envConfig;
const logger = common.logger;
const app = express();
exports.app = app;
const tableify = require('tableify');
app.use(common.cors);
app.get('/', (req, res) => {
    logger.info('HTTP request to root.');
    res.sendStatus(200);
});
app.use(`${config.base}/categories`, categories_1.default);
app.use(`${config.base}/questions`, questions_1.default);
app.use(`${config.base}/answers`, answers_1.default);
app.use(`${config.base}/register`, register_1.default);
app.use(`${config.base}/auth`, auth_1.default);
app.listen(process.env.PORT | config.port, () => {
    logger.info(`Example app listening on port ${config.port}!`);
});
process.on('uncaughtException', (err) => {
    logger.fatal('uncaught exception', err);
});
process.on('SIGTERM', (err) => {
    logger.fatal('SIGTERM', err);
});
//# sourceMappingURL=index.js.map