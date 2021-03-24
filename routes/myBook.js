const middleware = require("../middleware");
const express = require("express");
//use mergeParams to allow req.params.id to pass thru
const router = express.Router({mergeParams: true});

let connectToDb = function(booksDbConn, usersDbConn){

  //add comment
  router.post('/:id/comments', middleware.isLoggedIn, (req, res) => {
    if(req.body.message.trim() === ""){
      req.flash("info", "Whoops, your comment was blank.");
      res.redirect(`/myBook/${req.params.id}`);
      return;
    }
    booksDbConn.addComment(
      req.params.id,
      { comments: {
          username: req.body.username,
          message: req.body.message,
          date: middleware.getDateAndTime()
        }
      },
      (err, response) => {
        if(err){
          req.flash("info", "Your comment was not posted due to an error.");
        } else {
          req.flash("info", "Your comment is posted.");
        }
        res.redirect(`/myBook/${req.params.id}`);
      });
  });

  //GET COMMENT TO EDIT
  router.get('/:id/comments/:comment_id/edit', middleware.isLoggedIn, (req, res) => {
    booksDbConn.findById(req.params.id, (err, bookData)=> {
      if(err){
        req.flash("info", "Unable to retrieve comment to edit");
        res.redirect(`/myBook/${req.params.id}`);
        return;
      }
      let editComment = bookData[0].comments[req.params.comment_id];

      res.render("edit", {
        comment: {
          id: req.params.comment_id,
          message: editComment.message
        },
        bookId: req.params.id,
        messages: req.flash("info")
      });
    });
  });

  //UPDATE COMMENT
  router.put('/:id/comments/:comment_id', middleware.isLoggedIn, (req, res) => {
    booksDbConn.updateComment(req.params.id,  {
      id: req.params.comment_id,
      message: req.body.message,
      date: middleware.getDateAndTime(),
      edited: true
    }, (err, result) =>{
      if(err){
        req.flash("info", "Your comment was not updated due to an error.");
      } else {
        req.flash("info", "Your comment was updated.");
      }

      res.redirect(`/myBook/${req.params.id}`);
    });
  });

  //DELETE COMMENT
  router.delete('/:id/comments/:commentId', middleware.isLoggedIn, (req, res) => {
      booksDbConn.deleteComment(req.params.id, req.params.commentId, (err, result) =>{
        if(err){
          req.flash("info", "Your comment was NOT deleted due to an error.");
        } else {
          req.flash("info", "Your comment was deleted.");
        }
        res.redirect(`/myBook/${req.params.id}`);
      });
  });

  router.get('/:id', (req, res) => {
    booksDbConn.findById(req.params.id,
      function renderBookPage(err, data){
        if(err){
          req.flash("info", "Currently unable to access book.  Try searching for it in the navbar.");
          res.redirect("back");
          return;
        }
        if(data.length == 0){
          res.redirect("/home");
        } else {
          if(req.user){
            let bookFound = false;
            usersDbConn.findOne({username: req.user}, (err, userData)=>{
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
      req.flash("info", "The book has been removed from your library.");
      res.redirect("/home");
    });
  });

  return router;
}

module.exports = connectToDb;