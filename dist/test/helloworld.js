"use strict";
const request = require("supertest");
const index_1 = require("../app/index");
describe('store', () => {
    it('should return hello world', (done) => {
        request(index_1.app)
            .get('/')
            .expect(200)
            .end(done);
    });
});
//# sourceMappingURL=helloworld.js.map