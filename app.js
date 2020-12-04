//const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");
const {mongoCollection} = require("./database.js");
const {seed} = require("./seed.js");
const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));



//ARRAY FOR TEMP DATABASE
var myLibrary = seed();

let MAX_BOOKS_PER_SHELF = 5;
let booksCollection = mongoCollection("books");
console.log(booksCollection);


app.get('/', function getHome(req, res) {

    res.render("home", { myLibrary: myLibrary, maxBooksPerShelf: MAX_BOOKS_PER_SHELF });
});

//show
app.get('/book/:id', (req, res) => {
    //show a single book's details from google

    axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
        .then(response => formatBookDataFromGoogle(response.data))
        .then(bookData => res.render("book", { bookData: bookData, inMyLibrary: false }))
        .catch(err => console.log(`*****ERROR*****${err}`));

});

app.post('/book', (req, res) => {
    console.log("post request to add book");
    const googleBookID = req.body.bookID;
    axios.get(`https://www.googleapis.com/books/v1/volumes/${googleBookID}`)
        .then(response => formatBookDataFromGoogle(response.data))
        .then(bookData => {


            booksCollection.insert(bookData);
            //myLibrary.push(bookData);
            res.redirect("/");
        })
        .catch(err => {
            console.log(`*****ERROR***** ${err}`);
            res.redirect("/");
        });

    //need to add retrieved data to the library and database


});

//show
app.get('/myBook/:id', (req, res) => {

    //search local db
    for (let book of myLibrary) {
        if (book.id === req.params.id) {
            res.render("book", { bookData: book, inMyLibrary: true });
            return;
        }
    }

    console.log("book not found in myLibrary");
    res.redirect("/");

});

const port = process.env.PORT || 3000;
app.listen(port, function startServer() {
    console.log("Book server is up and running");
});

function formatBookDataFromGoogle(data) {
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