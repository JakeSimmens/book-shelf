const { TestScheduler } = require("jest");
const Book = require("../public/js/bookapi.js");

describe("Book module", () => {
    let book = Book();

    test("should return an array of 0 to 5 items", () => {
        expect(book.search("Jurassic Park")).toBeLessThanOrEqual(5);
    });
});