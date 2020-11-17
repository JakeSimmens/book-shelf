function fetchBooks() {
    var fetchGoogle = fetchGoogleBooks();

    var publicAPI = {

        fetchById(bookId) {
            return fetchGoogle.fetchById(bookId);
        },

        searchByTerm(term) {
            return fetchGoogle.searchByTerm(term);
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
                .then(response => response.json());
            //.then(data => console.log(data));
        },

        searchByTerm(term) {
            return fetch(`${googleBookQueryStr}${term}`)
                .then(response => response.json());
            //.then(data => console.log(data));
            //.then(data => displaySearchResults(data));
        }

    };

    return publicAPI;
}

if (!(typeof module === "undefined")) {

    exports.fetchBooks = fetchBooks;
}

