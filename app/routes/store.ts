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

router.get('/', async(req: express.Request, res: express.Response) => {
  logger.info('getting questions...');
  let scores: any;
  scores = await db.getScores();
  res.json(scores);
});

router.put('/', async(req: express.Request, res: express.Response) => {

  const body = await common.receiveBody(req);
  const score = body.s;
  const user = body.u;
  let qry_get = 'SELECT score FROM scoreboard.scores WHERE ?';
  let qry = 'UPDATE `scores` SET ? WHERE ?';
  let get_row = {
    user: user
  };

  let user_row = {
    user: user
  };

  poolScoreboard.query(qry_get, get_row, (err: any, rows: any[]) => {
    if(err){
      res.json({response: 'cannot get score!'})
    }
    if (!err) {
      let topscore = parseInt(score) + rows[0].score;
      let row_score = {
        score: topscore
      };
      poolScoreboard.query(qry, [row_score, user_row], (err: any, rows: any[]) => {
        if(err){
          res.json({response: 'cannot add score!'})
        }
        if (!err) {
          res.json({response: topscore})
        } else {
          res.json({response: 'failed to add score'});
        }
      });
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
