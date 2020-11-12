const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const searchResults = document.querySelector(".searchResults");

const googleBookQueryStr = "https://www.googleapis.com/books/v1/volumes?q=";
const googleBookVolumesStr = "https://www.googleapis.com/books/v1/volumes/";

searchBtn.addEventListener("click",
    function seachBtnClick() {
        searchSubject(searchInput.value);
    });

function searchSubject(term) {
    if (term == "") {
        clearSearchResults();
        return;
    }

    fetch(`${googleBookQueryStr}${term}`)
        .then(response => response.json())
        .then(data => displaySearchResults(data));
}

function displaySearchResults(data) {
    console.log("DATA");
    console.log(data);
    clearSearchResults();

    for (let book of data.items) {
        displaySingleBookResult(book);
    }
}

function clearSearchResults() {
    while (searchResults.firstChild) {
        searchResults.removeChild(searchResults.firstChild);
    }
}

function displaySingleBookResult(book) {
    let bookInfo = document.createElement("div");
    let image = document.createElement("img");
    let caption = document.createElement("div");
    let title = document.createElement("p");
    let authors = document.createElement("p");

    bookInfo.setAttribute("class", "searchResult");

    if (book.volumeInfo.imageLinks !== undefined) {
        image.setAttribute("src", book.volumeInfo.imageLinks.smallThumbnail);
    }

    if (book.volumeInfo.title !== undefined) {
        title.innerText = book.volumeInfo.title;
    }

    if (book.volumeInfo.authors !== undefined) {
        let authorList = book.volumeInfo.authors;
        let authorText = "";

        if (authorList.length == 0) {
            authorText = "By: unknown";
        } else {
            authorText = `By: ${authorList[0]}`;
            for (let i = 1; i < authorList.length; i++) {
                authorText.concat(`, ${authorList[i]}`);
            }
        }
        authors.innerText = authorText;
    }

    image.setAttribute("class", "searchImage");
    title.setAttribute("class", "searchTitle");
    authors.setAttribute("class", "searchAuthors");
    bookInfo.appendChild(image);
    bookInfo.appendChild(caption);
    caption.appendChild(title);
    caption.appendChild(authors);
    addClickListener(searchResults.appendChild(bookInfo), book.id);

}

function addClickListener(element, bookId) {
    element.addEventListener("click",
        function selectBook() {
            getMoreBookInfo(bookId);
        });
}

function getMoreBookInfo(id) {
    console.log(`Book id: ${id}`);
    getBook(id);
}

function getBook(id) {
    if (id == "") {
        return;
    }

    fetch(`${googleBookVolumesStr}${id}`)
        .then(response => response.json())
        .then(data => console.log(data));
}

// if (!(typeof module === "undefined")) {
//     module.exports = { Book };
// }

