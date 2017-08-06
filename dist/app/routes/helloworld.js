"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helloworld_1 = require("./../controller/helloworld");
exports.default = (req, res) => {
    helloworld_1.default().then(() => {
        console.log('hello world');
    });
};
//# sourceMappingURL=helloworld.js.map