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
  logger.info('getting categories...');
  let categories = await db.getCategories();
  res.json(categories);
});

router.post('/', async (req: express.Request, res: express.Response) => {

    const category = await common.receiveBody(req);
    let qry = 'INSERT INTO `categories` SET ?';

    let row = {
      name: category.cat
    };

    poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
      if(!err) {
        res.json({response: 'success'});
      }else{
        res.json({response: 'failed to add category'});
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