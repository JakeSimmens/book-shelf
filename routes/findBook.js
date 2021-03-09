//const {createMongoAPI} = require("../database.js");

const express = require("express");
const router = express.Router();
const axios = require("axios");

// const DATABASE = "jReads";
// const BOOKS_COLLECTION = "books";
// let db = createMongoAPI(DATABASE, BOOKS_COLLECTION);


let dbSetupForRoutes = function(dbConnection){

  //show google book
  router.get('/:id', async (req, res) => {
    const googleBookID = req.params.id;
    const url = `https://www.googleapis.com/books/v1/volumes/${googleBookID}`;

    try {
        let response = await axios.get(url);
        let bookData = formatBookDataFromGoogle(response.data);
        res.render("book", { bookData: bookData, googleBookID: googleBookID,inMyLibrary: false });

    } catch (err) {
        console.log("HTTP error, bad ID for url. ", err.message);
        res.redirect("/");
    }

  });

  //write
  router.post('/', async (req, res) => {
    const googleBookID = req.body.bookID;
    const url = `https://www.googleapis.com/books/v1/volumes/${googleBookID}`;

    try {
        let response = await axios.get(url);
        let bookData = formatBookDataFromGoogle(response.data);

        dbConnection.insert(bookData,
            function redirectToLibrary()
            {
                res.redirect("/");
            });

    } catch (err) {
        console.log("Error inserting book. ", err.message);
        res.redirect("/");
    }
  });

  return router;
}
//show google book
// router.get('/:id', async (req, res) => {
//     const googleBookID = req.params.id;
//     const url = `https://www.googleapis.com/books/v1/volumes/${googleBookID}`;

//     try {
//         let response = await axios.get(url);
//         let bookData = formatBookDataFromGoogle(response.data);
//         res.render("book", { bookData: bookData, googleBookID: googleBookID,inMyLibrary: false });

//     } catch (err) {
//         console.log("HTTP error, bad ID for url. ", err.message);
//         res.redirect("/");
//     }

// });

//write
// router.post('/', async (req, res) => {
//     const googleBookID = req.body.bookID;
//     const url = `https://www.googleapis.com/books/v1/volumes/${googleBookID}`;

//     try {
//         let response = await axios.get(url);
//         let bookData = formatBookDataFromGoogle(response.data);

//         db.insert(bookData,
//             function redirectToLibrary()
//             {
//                 res.redirect("/");
//             });

//     } catch (err) {
//         console.log("Error inserting book. ", err.message);
//         res.redirect("/");
//     }
// });

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

module.exports = dbSetupForRoutes;
//module.exports = {router, formatBookDataFromGoogle};