const ObjectId = require("mongodb").ObjectId;
const middleware = require("../middleware");
const express = require("express");
const router = express.Router();
//router.use(express.urlencoded({extended: true}));

let connectToDb = function(booksDbConn, usersDbConn){

  //add comment
  router.post('/:id/comments', middleware.isLoggedIn, (req, res) => {
    console.log(req.body);
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
        req.flash("info", "Your comment is posted.");
        res.redirect(`/myBook/${req.params.id}`);
      });
  });


  //GET COMMENT TO EDIT
  router.get('/:id/comments/:commentId/edit', middleware.isLoggedIn, (req, res) => {
    booksDbConn.findById(req.params.id, (bookData)=> {
      let editComment = bookData[0].comments[req.params.commentId];
      console.log("find comment: ", editComment);

      res.render("edit", {
        comment: {
          id: editComment.id,
          message: editComment.message
        },
        bookId: req.params.id,
        messages: req.flash("info")
      });
    });
  });

  //UPDATE COMMENT
  router.put('/:id/comments/:commentId', middleware.isLoggedIn, (req, res) => {
    booksDbConn.updateComment(req.params.id,  {
      comment: {
        id: req.params.commentId,
        message: req.body.message,
        date: middleware.getDateAndTime(),
        edited: true
      }
    }, (result) =>{
      req.flash("info", "Your comment was updated.");
      res.redirect(`/myBook/${req.params.id}`);

    });
  });

  //DELETE COMMENT
  router.delete('/:id/comments/:commentId', middleware.isLoggedIn, (req, res) => {
      booksDbConn.deleteComment(req.params.id, req.params.commentId, (result) =>{
        req.flash("info", "Your comment was deleted.");
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
                showComments: true,
                messages: req.flash("info")
                });
            });

          } else {
            res.render("book", {
              bookData: data[0],
              googleBookId: data[0].id,
              isGoogleBook: false,
              inUserLibrary: false,
              showComments: true,
              messages: req.flash("info")
              });
          }
        }
      });
  });

  router.delete('/:id', middleware.isLoggedIn, (req, res) => {
    //remove book from user library list
    usersDbConn.deleteUserBook(req.user, req.params.id, (response)=>{
      console.log("deleted: ", response);
      req.flash("info", "The book has been removed from your library.");
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