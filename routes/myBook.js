const middleware = require("../middleware");
const express = require("express");
const router = express.Router();

let connectToDb = function(booksDbConnection){
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

  //add comment
  router.post('/:id/comments', (req, res) => {
    console.log("req id: ", req.params.id);
    booksDbConnection.updateOne(
      {_id: req.params.id},
      {
        $push: {
          comments: {
            username: req.body.username,
            message: req.body.message,
            date: middleware.getDateAndTime()
          }
        }
      },
      (result) => {

        console.log("Update result count:", result.modifiedCount);

      });

    res.redirect(`/myBook/${req.params.id}`);
  });

  //add comment
  //delete comment
  //get reply
  //add reply
  //delete reply

  return router;
}

module.exports = connectToDb;