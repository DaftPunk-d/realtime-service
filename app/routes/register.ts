import * as _       from 'lodash';
import * as express from 'express';
import * as db   from '../../db/db';
import * as commonConfig from 'node-services-common-code';
const config = commonConfig.envConfig;
const logger = commonConfig.logger;
import Request = Express.Request;
import { poolScoreboard } from '../../db/db';
import * as common from '../utils/common';
import * as hash from '../utils/hashp';

let router = express.Router();


router.post('/', async (req: express.Request, res: express.Response) => {

  const user = await common.receiveBody(req);
  let qry = 'INSERT INTO `users` SET ?';
  let scores_qry = 'INSERT INTO `scores` SET ?';
  let today = new Date();
  let row = {
    username: user.username,
    email: user.email,
    password: hash.encode(user.password),
    created: today
  };

  let score_row = {
    score: 0,
    user: user.username
  };

  poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
    if(!err) {
      poolScoreboard.query(scores_qry, score_row, (err: any, rows: any[]) => {
        if(!err) {
          res.json({response: 'success'});
        }else{
          res.json({response: 'failed to add score'});
        }
      });
      this.router.navigate(["/login"]);
      res.json({response: 'success'});
    }else if(err.errno === 1062){
      res.json({response: 'email already used!'});
      // verwittig de gebruiker
    }else{
      res.json({response: 'failed to add user'});
    }
  });
});

export default router;
