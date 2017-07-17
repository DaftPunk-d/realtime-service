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
