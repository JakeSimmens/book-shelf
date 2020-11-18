function fetchBooks() {
    var fetchGoogle = fetchGoogleBooks();

    var publicAPI = {

        fetchById(bookId) {
            return fetchGoogle.fetchById(bookId);
        },

        searchByTerm(term) {
            return fetchGoogle.searchByTerm(term);
        },

        testMe(bookId) {
            return fetchGoogle.fetchById(bookId)
                .then(bookData => formatGoogleData(bookData));
        }

    };

    function formatGoogleData(data) {
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


    // {
    //     "kind": "books#volume",
    //     "id": string,
    //     "etag": string,
    //     "selfLink": string,
    //     "volumeInfo": {
    //       "title": string,
    //       "subtitle": string,
    //       "authors": [
    //         string
    //       ],
    //       "publisher": string,
    //       "publishedDate": string,
    //       "description": string,
    //       "industryIdentifiers": [
    //         {
    //           "type": string,
    //           "identifier": string
    //         }
    //       ],
    //       "pageCount": integer,
    //       "dimensions": {
    //         "height": string,
    //         "width": string,
    //         "thickness": string
    //       },
    //       "printType": string,
    //       "mainCategory": string,
    //       "categories": [
    //         string
    //       ],
    //       "averageRating": double,
    //       "ratingsCount": integer,
    //       "contentVersion": string,
    //       "imageLinks": {
    //         "smallThumbnail": string,
    //         "thumbnail": string,
    //         "small": string,
    //         "medium": string,
    //         "large": string,
    //         "extraLarge": string
    //       },
    //       "language": string,
    //       "previewLink": string,
    //       "infoLink": string,
    //       "canonicalVolumeLink": string
    //     },
    //     "searchInfo": {
    //       "textSnippet": string
    //     }
    //   }

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
                .then(response => response.json());
        }

    };

    return publicAPI;
}

if (!(typeof module === "undefined")) {

    exports.fetchBooks = fetchBooks;
}

