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

router.get('/', async(req: express.Request, res: express.Response) => {
  logger.info('getting anwsers...');
  let answers: any;
  let questionId = parseInt(req.query.questionId);
  if(questionId){
    answers = await db.getAnswersByQuestionId(questionId)
  }else{
    answers = await db.getAllAnswers();
  }
  res.json(answers);
});

router.post('/', async (req: express.Request, res: express.Response) => {

    const answers = await common.receiveBody(req);
    let qry = 'INSERT INTO `answers` SET ?';

    let row = {
      answer: answers.a,
      questionId: answers.id,
      isCorrect: answers.correct
    };

    poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
      if(!err) {
        res.json({response: 'success'});
      }else{
        res.json({response: 'failed to add answer'});
      }
    });
});

router.put('/', async (req: express.Request, res: express.Response) => {

  const answers = await common.receiveBody(req);
  let qry = 'UPDATE `answers` SET ? WHERE answers.id=?';

  let row = {
    answer: answers.a,
    questionId: answers.id,
    isCorrect: answers.correct
  };

  poolScoreboard.query(qry, [row, parseInt(answers.answerId)], (err: any, rows: any[]) => {
    if(!err) {
      res.json({response: 'success'});
    }else{
      res.json({response: 'failed to add answer'});
    }
  });
});


router.delete('/:id', async (req: express.Request, res: express.Response) => {

  const answerId = req.params.id;
  let qry = 'DELETE FROM `answers` WHERE ?';

  let row = {
    id: answerId,
  };

  poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
    if(!err) {
      res.json({response: 'success'});
    }else{
      res.json({response: 'failed to delete answer'});
    }
  });
});

export default router;