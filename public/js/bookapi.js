function fetchBooks() {
    var fetchGoogle = fetchGoogleBooks();

    var publicAPI = {

        fetchById(bookId) {
            return fetchGoogle.fetchById(bookId)
                .then(data => extractGoogleDataForOneBook(data));
        },

        searchByTerm(term) {
            return fetchGoogle.searchByTerm(term)
                .then(list => extractGoogleDataForListOfBooks(list));
        }

    };

    function extractGoogleDataForListOfBooks(list) {
        //argument: an array of objects
        let formatedBookList = [];

        for (let book of list) {
            formatedBookList.push(extractGoogleDataForOneBook(book));
        }

        return formatedBookList;
    }

    function extractGoogleDataForOneBook(data) {
        let formatedData = {};

        formatedData.id = data.id;
        formatedData.title = data.volumeInfo.title;
        formatedData.subtitle = data.volumeInfo.subtitle;
        formatedData.authors = data.volumeInfo.authors;
        formatedData.publisher = data.volumeInfo.publisher;
        formatedData.publishedDate = data.volumeInfo.publishedDate;
        formatedData.description = data.volumeInfo.description;
        formatedData.pageCount = data.volumeInfo.pageCount;
        formatedData.categories = data.volumeInfo.categories;
        formatedData.averageRating = data.volumeInfo.averageRating;
        formatedData.ratingsCount = data.volumeInfo.ratingsCount;
        formatedData.imageLinks = data.volumeInfo.imageLinks;

        return formatedData;
    }

    return publicAPI;

}

function fetchGoogleBooks() {

    const googleBookQueryStr = "https://www.googleapis.com/books/v1/volumes?q=";
    const googleBookVolumesStr = "https://www.googleapis.com/books/v1/volumes/";

    var publicAPI = {

        fetchById(bookId) {
            return fetch(`${googleBookVolumesStr}${bookId}`)
                .then(response => response.json());
        },

        searchByTerm(term) {
            return fetch(`${googleBookQueryStr}${term}`)
                .then(response => response.json())
                .then(data => data.items);
        }

    };

    return publicAPI;
}

if (!(typeof module === "undefined")) {

    exports.fetchBooks = fetchBooks;
}

