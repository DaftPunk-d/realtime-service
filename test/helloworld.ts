import * as request from 'supertest';
import {CallbackHandler, Response} from 'supertest';
import {app} from '../app/index';
import * as mocha from 'mocha';
import {expect} from 'chai';

describe('store', () => {
  it('should return hello world', (done: CallbackHandler) => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});

it('should make a new quiz', (done: CallbackHandler) => {
  request(app)
    .post('/categories')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      cat: 'biologie'
    })
    .expect(200)
    .expect((res: Response) => {
      expect(res.body.response).to.equal('success');
    })
    .end(done);
});
