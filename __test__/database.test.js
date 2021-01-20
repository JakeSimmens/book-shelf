const db = require("../database.js");
const MongoClient = require("mongodb").MongoClient;

const DATABASE = "jReads";
const BOOKS_COLLECTION = "books";

let mongoApi = db.createMongoAPI(DATABASE, BOOKS_COLLECTION);

describe("Database API", ()=>{

    describe("insert", ()=>{
        it("should connect with mongo client", async () =>{
            const mockConnect = jest.spyOn(MongoClient, "connect");
            mockConnect.mockImplementation();

            let data = {
                book: "Bible",
                author: "God"
            };
            let callback;

            await mongoApi.insert(data, callback);
            expect(mockConnect).toHaveBeenCalled();
        });
    });

    describe("findById", ()=>{
        it("should connect with mongo client", async () =>{
            const mockConnect = jest.spyOn(MongoClient, "connect");
            mockConnect.mockImplementation();

            let data = {
                id: "12345"
            };
            let callback;

            await mongoApi.findById(data, callback);
            expect(mockConnect).toHaveBeenCalled();
        });
    });

    describe("findOne", ()=>{
        it("should connect with mongo client", async () =>{
            const mockConnect = jest.spyOn(MongoClient, "connect");
            mockConnect.mockImplementation();

            let data = {
                id: "12345"
            };
            let callback;

            await mongoApi.findOne(data, callback);
            expect(mockConnect).toHaveBeenCalled();
        });
    });

    describe("findMany", ()=>{
        it("should connect with mongo client", async () =>{
            const mockConnect = jest.spyOn(MongoClient, "connect");
            mockConnect.mockImplementation();

            let data = {};
            let callback;

            await mongoApi.findMany(data, callback);
            expect(mockConnect).toHaveBeenCalled();
        });
    });

    describe("deleteOne", ()=>{
        it("should connect with mongo client", async () =>{
            const mockConnect = jest.spyOn(MongoClient, "connect");
            mockConnect.mockImplementation();

            let id = "12345";
            let callback;

            await mongoApi.deleteOne(id, callback);
            expect(mockConnect).toHaveBeenCalled();
        });
    });

    describe("clearDB", ()=>{
        it("should connect with mongo client", async () =>{
            const mockConnect = jest.spyOn(MongoClient, "connect");
            mockConnect.mockImplementation();

            let callback;

            await mongoApi.clearDB(callback);
            expect(mockConnect).toHaveBeenCalled();
        });
    });
});