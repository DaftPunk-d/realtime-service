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

router.put('/', async(req: express.Request, res: express.Response) => {

  const body = await common.receiveBody(req);
  const score = body.s;
  const user = body.u;
  let qry = 'INSERT INTO `scores` SET ?';
  let row = {
    score: score,
    user: user
  };

  poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
    if(err){
      res.json({response: 'cannot add score!'})
    }
    if (!err) {
      res.json({response: 'success'})
    } else {
      res.json({response: 'failed to add score'});
    }
  });
});

router.get('/:user', async(req: express.Request, res: express.Response) => {
  // let score = await db.getScores();
  // res.json(score);
});

export default router;
