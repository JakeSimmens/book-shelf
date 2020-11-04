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

    for (let book of data.items) {
        console.log(book.volumeInfo.title);
        console.log(book.volumeInfo.subtitle);
        //console.log(book.volumeInfo.authors[0]);
    }


    //create display of results
    let element = document.createElement("p");
    element.innerText = "test me";
    searchResults.appendChild(element);
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

