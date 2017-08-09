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
let atob = require('atob');
let btoa = require('btoa');

let router = express.Router();

router.post('/', async(req: express.Request, res: express.Response) => {

  const body = await common.receiveBody(req);
  const key = body.e;
  const email = atob(atob(key).split('??')[0]);
  const pass = atob(atob(key).split('??')[1]);
  let qry = 'SELECT username, email, password, role FROM `users` WHERE ?';
  let row = {
    email: email,
  };

  poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
    if(err){
      res.json({response: 'user not found!'})
    }
    if (!err) {
      if(!rows.length){
        res.json({response: 'user not found!'})
      }
      const verified = hash.verivy(pass, rows[0].password);
      if (verified) {
        //als user geverifierd is: doe iets
        if (rows[0].role === 'admin') {
          const roleKey = btoa(atob(key) + '//admin');
          res.json({response: roleKey});
        } else {
          const roleKey = btoa(atob(key) + '//' + rows[0].username);
          res.json({response: roleKey});
          // res.json({response: 'user not authenticated'})
        }
      } else {
        res.json({response: 'email and password do not match!'})
      }

    } else {
      res.json({response: 'failed to get user'});
    }
  });
});

router.delete('/:id', async(req: express.Request, res: express.Response) => {

  const questionId = req.params.id;
  let qry = 'DELETE FROM `questions` WHERE ?';

  let row = {
    id: questionId,
  };

  poolScoreboard.query(qry, row, (err: any, rows: any[]) => {
    if (!err) {
      res.json({response: 'success'});
    } else {
      res.json({response: 'failed to delete question'});
    }
  });
});

export default router;
