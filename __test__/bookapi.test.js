const { getBook } = require("../public/js/bookapi.js");

// describe("Book module", () => {
//     let book = Book();

//     test("should return an array of 0 to 5 items", () => {
//         expect(book.search("Jurassic Park").length).toBeLessThanOrEqual(5);
//     });
// });

describe("Google Book Search", () => {
    console.log("test");
    describe("getBook", () => {
        test('should return null for id of ""', () => {
            expect(getBook("")).toBeUndefined();
        });
    });
});


// test("should return 5", () => {
//     expect(five()).toBe(5);
// });