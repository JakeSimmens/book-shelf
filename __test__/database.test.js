const {insert, findMany, clearDB, deleteOne} = require("../database.js");

const doNothing = () => {};

let dbParams = {
    name: "test",
    collection: "books",
    isTestRun: true
};

async function seedTestData(){
    var bookData = {
        title: "Book for Testing",
        subtitle: "Prequel to Two"
    };

    return new Promise((resolve, reject) => {
        insert([bookData, bookData, bookData], () => {
            resolve();
        }, dbParams);
    });

};

describe("MongoDB CRUD Operations", () => {
    describe("clearDB function", () => {
        it("should work on this test for CRUD", async (done) => {

            await seedTestData();
            done();

            expect(2+5).toBe(7);
        });
    });
});

// describe("mongoDB CRUD Operations", () => {

//     describe("clearDB", async () => {

//         //await seedTestData();

//         it("should clear all entries from the database", (done) =>{

//             function callback(result){
//                 try {
//                     expect(result.deletedCount).toBe(3);
//                     done();
//                 } catch (err) {
//                     done(err);
//                 }
//             }

//             clearDB(callback, dbParams);


//     });
  
// });

describe("test it", () => {
    it("should work on this test", () => {
        expect(2+5).toBe(7);
    });
});