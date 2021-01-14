const testApp = require("../app");

jest.mock("../seed.js");  //stop seed from running

describe("Route - index.js", () => {
    afterAll(done => {
        testApp.server.close();
        done();
    });



    it("should work on this test", () => {
        expect(2+5).toBe(7);
    });
});