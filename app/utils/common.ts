const querystring = require('querystring');
import * as _ from 'lodash';

export function receiveBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let body: string = '';

    req.on('data', (chunk: string) => {
      body += chunk;
    });

    req.on('end', () => {
      // validate body format
      try {
        resolve(querystring.parse(body));
      } catch (ex) {
        reject({
          status: 'error parsing body',
          statusCode: 400
        });
      }
    });
  });
}

export function parseId(id: string) {
  if (_.isNil(id) || id === '') {
    return null;
  }
  try {
    return parseInt(id, 10);
  } catch (error) {
    throw {
      error: 'failed to parse id: ' + id,
      innerException: error
    };
  }
}
