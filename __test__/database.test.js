const db = require("../database.js");
const MongoClient = require("mongodb").MongoClient;

const DATABASE = "mockDB"; //"jReads";
const BOOKS_COLLECTION = "mockBooks"; //"books";

let mongoApi = db.createMongoAPI(DATABASE, BOOKS_COLLECTION);
mongoApi.setForTesting();

describe("Database API", ()=>{
    // afterAll(done => {
    //     testApp.server.close();
    //     done();
    // });


    // mongoApi.insert(data, (response) => {
    //     console.log("insert done: ", response);
    // });

    describe("insert", ()=>{
        it("should connect with mongo client", async () =>{
            const mockConnect = jest.spyOn(MongoClient, "connect");
            mockConnect.mockImplementation(()=>{});

            let data = {
                book: "Bible",
                author: "God"
            };
            let callback;

            await mongoApi.insert(data, callback);
            expect(mockConnect).toHaveBeenCalled();
            //expect(mockInsert).toHaveBeenCalled();
        });

        
    });



    it("should pass this test", () =>{
        expect(3*5).toBe(15);
    });
});