'use strict';
const passwordHash = require('password-hash');
function encode(password) {
    return passwordHash.generate(password);
}
exports.encode = encode;
function verivy(password, hashedPassword) {
    return passwordHash.verify(password, hashedPassword);
}
exports.verivy = verivy;
//# sourceMappingURL=hashp.js.map