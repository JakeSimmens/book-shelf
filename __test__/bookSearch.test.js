const { getBook, displaySingleBookResult } = require("../public/js/bookSearch.js");

// describe("Book module", () => {
//     let book = Book();

//     test("should return an array of 0 to 5 items", () => {
//         expect(book.search("Jurassic Park").length).toBeLessThanOrEqual(5);
//     });
// });

describe("Google Book Search", () => {

    describe("displaySingleBookResult", () => {

        let bookData = {
            volumeInfo: {
                imageLinks: {
                    smallThumbNail: "http://small.com"
                },
                title: "The Test Book",
                authors: ["Person One", "Person 2"]
            }
        }


    });


    describe("getBook", () => {
        test('should return null for id of ""', () => {
            expect(getBook("")).toBeUndefined();
        });
    });
});


// test("should return 5", () => {
//     expect(five()).toBe(5);
// });