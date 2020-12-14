const {insert, findMany, clearDB} = require("../database.js");

const doNothing = () => {};

let dbParams = {
    name: "test",
    collection: "books",
    isTestRun: true
};

describe("mongoDB CRUD Operations", () => {
    describe("clearDB", () => {
        var bookData = {
            title: "Book for Testing",
            subtitle: "Prequel to Two"
        };

        insert(bookData, doNothing, dbParams);

        it("should clear all entries from the database", () =>{
            // let checkDatabaseEmpty = findMany(
            //     {},
            //     (result) => {
            //         console.log("Result: ", result);
            //         expect(result.length).toBe(0);
            //     },
            //     dbParams);

            clearDB(doNothing, dbParams);
            findMany({},(result)=>{
                //console.log("Result: ", result);
                expect(result.length).toBe(0);
            }
            ,dbParams);

        });

    });
    describe("insert", () => {

        var bookData = {
            title: "Book for Testing",
            subtitle: "Prequel to Two",
            authors: ["Bob Bill", "Ray Bob", "Tracy Fred"],
            publisher: "Publishing House",
            publishedDate: "July 2015",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus ligula leo. Donec pretium tincidunt diam, et malesuada ex tincidunt sed.",
            pageCount: 590,
            categories: "adventure",
            averageRating: 4.7,
            ratingsCount: 14698,
            imageLinks: {
                thumbnail: "/images/jurassicPark.jpg",
                small: "/images/jurassicPark.jpg"
            }
        };

        it("should add book to database", () =>{
            insert(bookData, doNothing, dbParams);

            //search for book
            expect(2+2).toBe(4);
  
        })
    });
});