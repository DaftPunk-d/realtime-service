import * as express from 'express';
import {Application, Request, Response, NextFunction} from 'express';
import categoryRoutes from './routes/categories';
import questionRoutes from './routes/questions';
import answerRoutes from './routes/answers';
import * as moment from 'moment';
import * as common from 'node-services-common-code';
import * as os from 'os';
const config = common.envConfig;
const logger = common.logger;
const app: Application = express();
const tableify = require('tableify');

app.use(common.cors);

app.get('/', (req: Request, res: Response) => {
  logger.info('HTTP request to root.');
  res.sendStatus(200);
});
// API end points

app.use(`${config.base}/categories`, categoryRoutes);
app.use(`${config.base}/questions`, questionRoutes);
app.use(`${config.base}/answers`, answerRoutes);


app.listen(process.env.PORT | config.port, () => {
  logger.info(`Example app listening on port ${config.port}!`);
});

// Gracefully handle the server being killed by external processes like NodeMon so that the port is also closed.
process.on('uncaughtException', (err: any) => {
  logger.fatal('uncaught exception', err);
});

process.on('SIGTERM', (err: any) => {
  logger.fatal('SIGTERM', err);
});

export { app };
