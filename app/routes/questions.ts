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
  let categoryId = req.query.categoryId;
  if(_.isNumber(parseInt(categoryId))){
    questions = await db.getQuestionsByCategoryId(categoryId)
  }else{
    questions = await db.getAllQuestions();
  }
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

  const categoryId = req.params.id;
  let qry = 'DELETE FROM `categories` WHERE id=?';


  poolScoreboard.query(qry, categoryId, (err: any, rows: any[]) => {
    if(!err) {
      res.json({response: 'success'});
    }else{
      res.json({response: 'failed to delete category'});
    }
  });
});

export default router;