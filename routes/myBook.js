const ObjectId = require("mongodb").ObjectId;
const middleware = require("../middleware");
const express = require("express");
const router = express.Router();

let connectToDb = function(booksDbConnection){

  //add comment
  router.post('/:id/comments', (req, res) => {
    //need _id, and comment object to push

    booksDbConnection.addComment(
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

  router.delete('/:id/comments/:commentId', (req, res) => {

      booksDbConnection.deleteComment(req.params.id, req.params.commentId, (result) =>{
        console.log("update done");
        //console.log(result);
        res.redirect(`/myBook/${req.params.id}`);

      });
  });

  //add comment
  //delete comment
  //get reply
  //add reply
  //delete reply


  router.get('/:id', (req, res) => {
    booksDbConnection.findById(req.params.id,
      function renderBookPage(data){
        if(data.length == 0){
          res.redirect("/");
        } else {
          res.render("book", {
            bookData: data[0],
            inMyLibrary: true
            });
        }
      });
  });

  router.delete('/:id', (req, res) => {
    booksDbConnection.deleteOne(req.params.id,
      function redirecToLibrary()
      {
        res.redirect("/");
      });
  });



  return router;
}

module.exports = connectToDb;