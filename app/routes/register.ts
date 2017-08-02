import * as _       from 'lodash';
import * as express from 'express';
import * as db   from '../../db/db';
import * as commonConfig from 'node-services-common-code';
const config = commonConfig.envConfig;
const logger = commonConfig.logger;
import Request = Express.Request;
import { poolScoreboard } from '../../db/db';
import * as common from '../utils/common';

let router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {

  const user = await common.receiveBody(req);
  let qry = 'INSERT INTO `users` SET ?';

  let row = {
    username: user.username,
    email: user.email,
    password: user.password
  };

  poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
    if(!err) {
      res.json({response: 'success'});
    }else{
      res.json({response: 'failed to add user'});
    }
  });
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {

  const questionId = req.params.id;
  let qry = 'DELETE FROM `questions` WHERE ?';

  let row = {
    id: questionId,
  };

  poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
    if(!err) {
      res.json({response: 'success'});
    }else{
      res.json({response: 'failed to delete question'});
    }
  });
});

export default router;
