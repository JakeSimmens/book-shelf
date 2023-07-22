// const {BASE_PATH} = require("../secrets");
const {BASE_PATH}  = require("../config.js");

const middleware = require("../middleware");
const express = require("express");
//use mergeParams to allow req.params.id to pass thru
const router = express.Router({mergeParams: true});

let connectToDb = function(booksDbConn, usersDbConn){

  //ADD COMMENT
  router.post('/', middleware.isLoggedIn, (req, res) => {
    if(req.body.message.trim() === ""){
      req.flash("info", "Whoops, your comment was blank.");
      res.redirect(`${BASE_PATH}/myBook/${req.params.id}`);
      return;
    }
    booksDbConn.addComment(
      req.params.id,
      { comments: {
          username: req.body.username,
          rating: req.body.starCounter,
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
        res.redirect(`${BASE_PATH}/myBook/${req.params.id}`);
      });
  });

  //EDIT COMMENT
  router.get('/:comment_id/edit', middleware.isLoggedIn, (req, res) => {
    booksDbConn.findById(req.params.id, (err, bookData)=> {
      if(err){
        req.flash("info", "Unable to retrieve comment to edit");
        res.redirect(`${BASE_PATH}/myBook/${req.params.id}`);
        return;
      }
      let editComment = bookData[0].comments[req.params.comment_id];
      console.log(editComment)
      res.render("edit", {
        comment: {
          id: req.params.comment_id,
          rating: editComment.rating,
          message: editComment.message
        },
        bookId: req.params.id,
        messages: req.flash("info")
      });
    });
  });

  //UPDATE COMMENT
  router.put('/:comment_id', middleware.isLoggedIn, (req, res) => {
    booksDbConn.updateComment(req.params.id,  {
      id: req.params.comment_id,
      rating: req.body.starCounter,
      message: req.body.message,
      date: middleware.getDateAndTime(),
      edited: true
    }, (err, result) =>{
      if(err){
        req.flash("info", "Your comment was not updated due to an error.");
      } else {
        req.flash("info", "Your comment was updated.");
      }

      res.redirect(`${BASE_PATH}/myBook/${req.params.id}`);
    });
  });

  //DELETE COMMENT
  router.delete('/:commentId', middleware.isLoggedIn, (req, res) => {
      booksDbConn.deleteComment(req.params.id, req.params.commentId, (err, result) =>{
        if(err){
          req.flash("info", "Your comment was NOT deleted due to an error.");
        } else {
          req.flash("info", "Your comment was deleted.");
        }
        res.redirect(`${BASE_PATH}/myBook/${req.params.id}`);
      });
  });

  return router;
}

module.exports = connectToDb;