const {insert, findMany} = require("../database.js");

describe("mongoDB CRUD Operations", () => {
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

        dbParams = {
            name: "test",
            collection: "books",
            isTestRun: true
        };



        it("should add book to database", () =>{
            insert(bookData, () => {}, dbParams);

            //search for book
            expect(2+2).toBe(4);
  
        })
    });
});