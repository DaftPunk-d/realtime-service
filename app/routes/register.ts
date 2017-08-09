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
  let today = new Date();
  let row = {
    username: user.username,
    email: user.email,
    password: hash.encode(user.password),
    created: today
  };

  poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
    if(!err) {
      res.json({response: 'success'});
      // redirect to login
    }else if(err.errno === 1062){
      res.json({response: 'email already used!'});
      // verwittig de gebruiker
    }else{
      res.json({response: 'failed to add user'});
    }
  });
});

export default router;
