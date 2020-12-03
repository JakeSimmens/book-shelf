//const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");

const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));



//DATABASE
var myLibrary = [
    {
        id: "abc123",
        title: "The Book of One",
        subtitle: "Prequel to Two",
        authors: ["Bob Bill", "Ray Bob", "Tracy Fred"],
        publisher: "Publishing House",
        publishedDate: "July 2015",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus ligula leo. Morbi mattis diam vestibulum mi venenatis faucibus. Nullam nec euismod felis, a vulputate turpis. Nunc eget dui eget lorem mollis consectetur. Aliquam pharetra nunc vel eleifend sodales. Pellentesque eget ex ac nisl fringilla vulputate. Integer aliquam ultrices felis at elementum. Vestibulum libero massa, eleifend a libero et, auctor ultricies odio. Donec pretium tincidunt diam, et malesuada ex tincidunt sed.",
        pageCount: 590,
        categories: "adventure",
        averageRating: 4.7,
        ratingsCount: 14698,
        imageLinks: {
            thumbnail: "/images/jurassicPark.jpg",
            small: "/images/jurassicPark.jpg"
        }
    },
    {
        id: "def123",
        title: "The Book of Two",
        subtitle: "Prequel to Three",
        authors: ["One Bob", "Four Fred"],
        publisher: "What? Publishing House",
        publishedDate: "May 2018",
        description: "A Second book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus ligula leo. Morbi mattis diam vestibulum mi venenatis faucibus. Nullam nec euismod felis, a vulputate turpis. Nunc eget dui eget lorem mollis consectetur. Aliquam pharetra nunc vel eleifend sodales. Pellentesque eget ex ac nisl fringilla vulputate. Integer aliquam ultrices felis at elementum. Vestibulum libero massa, eleifend a libero et, auctor ultricies odio. Donec pretium tincidunt diam, et malesuada ex tincidunt sed.",
        pageCount: 450,
        categories: "romantic",
        averageRating: 2.1,
        ratingsCount: 589,
        imageLinks: {
            thumbnail: "/images/lostWorld.jpg",
            small: "/images/lostWorld.jpg"
        }
    },
    {
        id: "last123",
        title: "Three Book",
        subtitle: "Another one",
        authors: ["One Bob"],
        publisher: "House of Books",
        publishedDate: "May 2018",
        description: "A third book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus ligula leo. Morbi mattis diam vestibulum mi venenatis faucibus. Nullam nec euismod felis, a vulputate turpis. Nunc eget dui eget lorem mollis consectetur. Aliquam pharetra nunc vel eleifend sodales. Pellentesque eget ex ac nisl fringilla vulputate. Integer aliquam ultrices felis at elementum. Vestibulum libero massa, eleifend a libero et, auctor ultricies odio. Donec pretium tincidunt diam, et malesuada ex tincidunt sed.",
        pageCount: 234,
        categories: "sleeper",
        averageRating: 2.3,
        ratingsCount: 45,
        imageLinks: {
            thumbnail: "/images/darkTower.jpg",
            small: "/images/darkTower.jpg"
        }
    }
];

let MAX_BOOKS_PER_SHELF = 5;


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
            myLibrary.push(bookData);
            res.redirect("/");
        })
        .catch(err => {
            console.log(`*****ERROR*****${err}`);
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