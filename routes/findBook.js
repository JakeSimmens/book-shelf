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
      let bookData = middleware.formatBookDataFromGoogle(response.data);

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
      res.redirect(`/home`);
    }

  });

  //write
  router.post('/', middleware.isLoggedIn, async (req, res) => {
    const googleBookID = req.body.bookID;
    const url = `https://www.googleapis.com/books/v1/volumes/${googleBookID}`;

    try {
      let response = await axios.get(url);
      let bookData = middleware.formatBookDataFromGoogle(response.data);

      if(req.user){
        await booksDbConn.findOne({id: bookData.id}, async (err, bookInDb)=>{
          if(err){
            console.log("Error searching for book in db");
            req.flash("info", `Your book could not be added.`);
            res.redirect("back");
            return;
          }
          if(bookInDb){
            await usersDbConn.addUserBook(req.user, bookInDb._id, (err)=>{
              if(err){
                req.flash("info", `${bookData.title} unable to add to your library.`);
              } else {
                req.flash("info", `${bookData.title} has been added to your library.`);
              }
              res.redirect(`/myBook/${bookInDb._id}`);
            });
            

          } else {
            await booksDbConn.insert(bookData,
              async function addToUserLibrary(err, result)
              {
                if(err){
                  req.flash("info", `Your book could not be added.`);
                  res.redirect("back");
                  return;
                }
                await usersDbConn.addUserBook(req.user, result.ops[0]._id, (err) => {
                  if(err){
                    req.flash("info", `${bookData.title} has NOT been added to your library due to an error.`);
                  } else {
                    req.flash("info", `${bookData.title} has been added to your library.`);
                  }
                  res.redirect(`/myBook/${result.ops[0]._id}`);
                });
              });
          }
        });
      } else {
        req.flash("info", "Please login to add a book to your library.");
        res.redirect(`/`);
      }

    } catch (err) {
      req.flash("info", "Error.  Unable to add book to library.");
      console.log(err);
      res.redirect(`/home`);
    }
  });

  return router;
}

module.exports = connectToDb;