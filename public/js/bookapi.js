const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const searchResults = document.querySelector(".searchResults");


searchBtn.addEventListener("click",
    function seachBtnClick() {
        searchSubject(searchInput.value);
    });


const googleBookQueryStr = "https://www.googleapis.com/books/v1/volumes?q=";

function searchSubject(term) {
    if (term == "") {
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
    let title = document.createElement("p");

    bookInfo.setAttribute("class", "searchResult");
    image.setAttribute("src", book.volumeInfo.imageLinks.smallThumbnail);
    image.setAttribute("class", "searchImage");
    title.innerText = book.volumeInfo.title;
    bookInfo.appendChild(image);
    bookInfo.appendChild(title);
    addClickListener(searchResults.appendChild(bookInfo));
}

function addClickListener(element) {
    element.addEventListener("click",
        function getMoreBookInfo() {
            alert("Like this book");
        });
}


function Book() {



    var bookAPI = {
        print() {
            console.log("hello");
        },
        printFunny() {
            console.log("hahahah");
        },
        async search(searchTerm) {
            let result = await searchSubject(searchTerm);
            return result;
        }
    }

    return bookAPI;
}

if (!(typeof module === "undefined")) {
    module.exports = { Book };
}

