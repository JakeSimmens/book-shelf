const ObjectId = require("mongodb").ObjectId;
const middleware = require("../middleware");
const express = require("express");
const router = express.Router();

let connectToDb = function(booksDbConn, usersDbConn){

  //add comment
  router.post('/:id/comments', middleware.isLoggedIn, (req, res) => {
    
    //needs id, and comment object to push
    booksDbConn.addComment(
      req.params.id,
      { comments: {
          username: req.body.username,
          message: req.body.message,
          date: middleware.getDateAndTime()
        }
      },
      (result) => {
        console.log("Update result count:", result.modifiedCount);
        res.redirect(`/myBook/${req.params.id}`);
      });
  });

  router.delete('/:id/comments/:commentId', middleware.isLoggedIn, (req, res) => {
      booksDbConn.deleteComment(req.params.id, req.params.commentId, (result) =>{
        console.log("update done");
        res.redirect(`/myBook/${req.params.id}`);

      });
  });

  router.get('/:id', (req, res) => {
    booksDbConn.findById(req.params.id,
      function renderBookPage(data){
        if(data.length == 0){
          res.redirect("/home");
        } else {

          if(req.user){
            let bookFound = false;
            usersDbConn.findOne({username: req.user}, (err, userData)=>{
              for(let id of userData.library){
                if(id == req.params.id){
                  bookFound = true;
                  break;
                }
              }
              res.render("book", {
                bookData: data[0],
                googleBookId: data[0].id,
                isGoogleBook: false,
                inUserLibrary: bookFound,
                showComments: true
                });
            });

          } else {
            res.render("book", {
              bookData: data[0],
              googleBookId: data[0].id,
              isGoogleBook: false,
              inUserLibrary: false,
              showComments: true
              });
          }
        }
      });
  });

  router.delete('/:id', middleware.isLoggedIn, (req, res) => {
    //remove book from user library list
    usersDbConn.deleteUserBook(req.user, req.params.id, (response)=>{
      console.log("deleted: ", response);
      res.redirect("/home");
    });

    // delete book for book db
    // booksDbConn.deleteOne(req.params.id,
    //   function redirecToLibrary()
    //   {
    //     res.redirect("/");
    //   });
  });



  return router;
}

module.exports = connectToDb;