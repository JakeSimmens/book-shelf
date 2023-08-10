const middleware = require("../middleware");
const express = require("express");
//use mergeParams to allow req.params.id to pass thru
const router = express.Router({mergeParams: true});

let connectToDb = function(booksDbConn, usersDbConn){

  //GET BOOK
  router.get('/:id', (req, res) => {
    booksDbConn.findById(req.params.id, async (err, data) => {
      if(err){
        req.flash("info", "Currently unable to access book.  Try searching for it in the navbar.");
        res.redirect("back");
        return;
      }
      if(data.length == 0){
        res.redirect(`/home`);
        return;
      }

      let bookFound = false;
      if(req.user){
        await usersDbConn.findOne({username: req.user}, (err, userData)=>{
          if(err){
            console.log("Unable to locate user to check personal library");
          }
          if(userData.library){
            for(let id of userData.library){
              if(id == req.params.id){
                bookFound = true;
                break;
              }
            }
          }
        });
      }

      res.render("book", {
        bookData: data[0],
        googleBookId: data[0].id,
        isGoogleBook: false,
        inUserLibrary: bookFound,
        showComments: true,
        messages: req.flash("info")
        });
      });
  });

  //DELETE BOOK
  router.delete('/:id', middleware.isLoggedIn, (req, res) => {
    //remove book from user library list
    usersDbConn.deleteUserBook(req.user, req.params.id, (err, response)=>{
      if(err){
        req.flash("info", "Unable to remove the book from your library.");
      } else {
        req.flash("info", "The book has been removed from your library.");
      }
      res.redirect(`/home`);
    });
  });

  return router;
}

module.exports = connectToDb;