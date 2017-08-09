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
  logger.info('getting questions...');
  let questions: any;
  let categoryId = parseInt(req.query.categoryId);
  if(_.isNumber(categoryId)){
    questions = await db.getQuestionsByCategoryId(categoryId)
  }else{
    questions = await db.getAllQuestions();
  }
  res.json(questions);
});

router.get('/all', async(req: express.Request, res: express.Response) => {
  logger.info('getting questions...');
  let questions: any;
  questions = await db.getAllQuestions();
  res.json(questions);
});

router.post('/', async (req: express.Request, res: express.Response) => {

    const question = await common.receiveBody(req);
    let qry = 'INSERT INTO `questions` SET ?';

    let row = {
      question: question.q,
      categoryId: question.categoryId
    };

    poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
      if(!err) {
        res.json({response: 'success'});
      }else{
        res.json({response: 'failed to add question'});
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