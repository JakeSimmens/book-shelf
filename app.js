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
    const { formatBookDataFromGoogle } = require("./public/js/extractBookData.js");

    axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
        .then(response => formatBookDataFromGoogle(response.data))
        .then(bookData => res.render("book", { bookData: bookData }))
        .catch(err => console.log(`*****ERROR*****${err}`));
});

const port = process.env.PORT || 3000;
app.listen(port, function startServer() {
    console.log("Book server is up and running");
});
