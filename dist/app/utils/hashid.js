'use strict';
const HashIds = require('hashids');
const hashIds = new HashIds('quiz:ACtCbvXcUqxrt46j', 16);
function decode(userId) {
    return hashIds.decode(userId)[0];
}
exports.decode = decode;
function encode(userId) {
    return hashIds.encode(parseInt(userId));
}
exports.encode = encode;
//# sourceMappingURL=hashid.js.map