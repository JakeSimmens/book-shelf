const express = require("express");
const router = express.Router();
const axios = require("axios");
const middleware = require("../middleware");

let connectToDb = function(booksDbConn, usersDbConn){

  //show google book
  router.get('/:id', async (req, res) => {
    const googleBookID = req.params.id;
    const url = `https://www.googleapis.com/books/v1/volumes/${googleBookID}`;

    try {
      let response = await axios.get(url);
      let bookData = formatBookDataFromGoogle(response.data);

      res.render("book", { 
        bookData: bookData, 
        googleBookId: googleBookID,
        isGoogleBook: true,
        inUserLibrary: false, 
        showComments: false,
        messages: req.flash("info")
      });

    } catch (err) {
      console.log("HTTP error, bad ID for url. ", err.message);
      res.redirect("/home");
    }

  });

  //write
  router.post('/', middleware.isLoggedIn, async (req, res) => {
    const googleBookID = req.body.bookID;
    const url = `https://www.googleapis.com/books/v1/volumes/${googleBookID}`;

    try {
      let response = await axios.get(url);
      let bookData = formatBookDataFromGoogle(response.data);

      if(req.user){
        await booksDbConn.findOne({id: bookData.id}, async (err, bookInDb)=>{
          if(bookInDb){
            await usersDbConn.addUserBook(req.user, bookInDb._id);
            req.flash("info", `${bookData.title} has been added to your library.`);
            res.redirect(`/myBook/${bookInDb._id}`);
          } else {
            await booksDbConn.insert(bookData,
              async function addToUserLibrary(result)
              {
                await usersDbConn.addUserBook(req.user, result.ops[0]._id);
                req.flash("info", `${bookData.title} has been added to your library.`);
                res.redirect(`/myBook/${result.ops[0]._id}`);
              });
          }
        });
      } else {
        req.flash("info", "Please login to add a book to your library.");
        res.redirect("/home");
      }

    } catch (err) {
      req.flash("info", "Error.  Unable to add book to library.");
      console.log(err);
      res.redirect("/home");
    }
  });

  return router;
}

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

module.exports = connectToDb;
//module.exports = {router, formatBookDataFromGoogle};