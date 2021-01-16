const testApp = require("../app");
const request = require("supertest");
const bodyParser = require("body-parser");

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
        await request(testApp)
            .get("/")
            .expect(200)
    });

    describe("Routes for /register", () => {
        it("should GET register page", async() => {
            await request(testApp)
                .get("/register")
                .expect(200)
        });
    
        it("should POST register page with no credentials sent", async() => {
            await request(testApp)
                .post("/register")
                .expect(302)
        });
    });

    describe("Routes for /login", () => {
        it("should GET login", async () => {
            await request(testApp)
                .get("/login")
                .expect(200)
        });
    
        it("should POST login with no credentials sent", async () => {
            await request(testApp)
                .post("/login")
                .expect(302)
        });
    });

    describe("Route for /logout", () => {
        it("should GET /logout with no one logged in", async () => {
            await request(testApp)
                .get("/logout")
                .expect(302)
        });
    });



});