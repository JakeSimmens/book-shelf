const testApp = require("../app");
const request = require("supertest");
const databaseAPI = require("../database");

jest.mock("../seed.js");  //stop seed from running
jest.mock("../database", () => {

    function createMongoAPI(database, collection){

        let findMany = jest.fn(
            (term, callback) => {
                callback([]);
            }
        );
        let publicAPI = {
            findMany
        }
        return publicAPI;
    }
    return {createMongoAPI};
});

describe("Route - index.js", () => {
    afterAll(done => {
        testApp.server.close();
        done();
    });

    it("should load the homepage", async () => {
        let response = await request(testApp)
            .get("/")
 
        expect(response.statusCode).toEqual(200);
    });

    it("should work on this test", () => {
        expect(2+5).toBe(7);
    });
});