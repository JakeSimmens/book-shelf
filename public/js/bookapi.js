//const { formatBookDataFromGoogle } = require("./extractBookData");

function fetchBooks() {
    var googleBooks = fetchGoogleBooks();

    var publicAPI = {

        fetchById(bookId) {
            return googleBooks.fetchById(bookId);
        },

        searchByTerm(term) {
            return googleBooks.searchByTerm(term);
        }

    };

    return publicAPI;

}

function fetchGoogleBooks() {

    const googleBookQueryStr = "https://www.googleapis.com/books/v1/volumes?q=";
    const googleBookVolumesStr = "https://www.googleapis.com/books/v1/volumes/";

    var publicAPI = {

        fetchById(bookId) {
            return fetch(`${googleBookVolumesStr}${bookId}`)
                .then(response => response.json())
                .then(book => extractGoogleDataForOneBook(book));
        },

        searchByTerm(term) {
            return fetch(`${googleBookQueryStr}${term}`)
                .then(response => response.json())
                .then(bookList => extractGoogleDataForListOfBooks(bookList.items));
        },

        formatData(data) {
            if (typeof data === "object") {
                return extractGoogleDataForOneBook(data);
            } else {
                return {};
            }

        }

    };

    function extractGoogleDataForListOfBooks(bookList) {
        //argument: an array of objects
        let extractedBookListData = [];

        for (let book of bookList) {
            extractedBookListData.push(extractGoogleDataForOneBook(book));
        }

        return extractedBookListData;
    }

    function extractGoogleDataForOneBook(data) {

        //access external function to format data
        return formatBookDataFromGoogle(data);
    }

    return publicAPI;
}

if (!(typeof module === "undefined")) {

    exports.fetchBooks = fetchBooks;
    exports.fetchGoogleBooks = fetchGoogleBooks;
}
//exports.fetchBooks = fetchBooks;
