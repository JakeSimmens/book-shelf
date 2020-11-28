const express = require("express");
const app = express();
const axios = require("axios");


app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', function getHome(req, res) {

    res.render("home");
});

//show
app.get('/book/:id', (req, res) => {
    //show a single book's details from google

    axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
        .then(response => formatBookDataFromGoogle(response.data))
        .then(bookData => res.render("book", { bookData: bookData }))
        .catch(err => console.log(`*****ERROR*****${err}`));

});

app.post('/book', (req, res) => {
    console.log("post request to add book");

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