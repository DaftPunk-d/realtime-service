"use strict";
const querystring = require('querystring');
const _ = require("lodash");
function receiveBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                resolve(querystring.parse(body));
            }
            catch (ex) {
                reject({
                    status: 'error parsing body',
                    statusCode: 400
                });
            }
        });
    });
}
exports.receiveBody = receiveBody;
function parseId(id) {
    if (_.isNil(id) || id === '') {
        return null;
    }
    try {
        return parseInt(id, 10);
    }
    catch (error) {
        throw {
            error: 'failed to parse id: ' + id,
            innerException: error
        };
    }
}
exports.parseId = parseId;
//# sourceMappingURL=common.js.map