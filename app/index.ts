import * as express from 'express';
import {Application, Request, Response, NextFunction} from 'express';
import categoryRoutes from './routes/categories';
import questionRoutes from './routes/questions';
import answerRoutes from './routes/answers';
import registerRoutes from './routes/register';
import authRoutes from './routes/auth';
import * as common from 'node-services-common-code';
const config = common.envConfig;
const logger = common.logger;
const app: Application = express();

app.use(common.cors);

app.get('/', (req: Request, res: Response) => {
  logger.info('HTTP request to root.');
  res.sendStatus(200);
});
// API end points

app.use(`${config.base}/categories`, categoryRoutes);
app.use(`${config.base}/questions`, questionRoutes);
app.use(`${config.base}/answers`, answerRoutes);
app.use(`${config.base}/register`, registerRoutes);
app.use(`${config.base}/auth`, authRoutes);

app.listen(process.env.PORT | config.port, () => {
// app.listen(process.env.PORT, () => {
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
