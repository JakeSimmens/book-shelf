const testApp = require("../app");
const request = require("supertest");
const axios = require("axios");

jest.mock("../seed.js");  //stop seed from running
jest.mock("axios");
jest.mock("../database.js", () => {

    function createMongoAPI(database, collection){

        let findMany = jest.fn((term, callback) => {callback([])});
        let insert = jest.fn((data, callback) => {callback()});
        let findById = jest.fn((id, callback) => {callback([])});
        let publicAPI = {
            findMany,
            insert,
            findById
        }
        return publicAPI;
    }
    return {createMongoAPI};
});

describe("Route /myBook", () => {
    afterAll(done => {
        testApp.server.close();
        done();
    });

    it("should request a book not in the database and redirect to '/'", async () => {
        let response = await request(testApp)
            .get("/myBook/6KTPirqYw5wC")
        expect(response.header.location).toBe("/");
    });
});