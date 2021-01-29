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
        let extractedData = {};

        extractedData.id = data.id;
        extractedData.title = data.volumeInfo.title;
        extractedData.subtitle = data.volumeInfo.subtitle;
        extractedData.authors = data.volumeInfo.authors;
        extractedData.publisher = data.volumeInfo.publisher;
        extractedData.publishedDate = data.volumeInfo.publishedDate;
        extractedData.description = data.volumeInfo.description;
        extractedData.pageCount = data.volumeInfo.pageCount;
        extractedData.categories = data.volumeInfo.categories;
        extractedData.averageRating = data.volumeInfo.averageRating;
        extractedData.ratingsCount = data.volumeInfo.ratingsCount;
        extractedData.imageLinks = data.volumeInfo.imageLinks;

        return extractedData;
    }
    return publicAPI;
}

if (!(typeof module === "undefined")) {
    exports.fetchBooks = fetchBooks;
    exports.fetchGoogleBooks = fetchGoogleBooks;
}
