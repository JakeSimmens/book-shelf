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

  //get comment
  router.post('/:id/comments', (req, res) => {
    //booksDbConnection.update();
    res.send("comment received");
  });
  //add comment
  //delete comment
  //get reply
  //add reply
  //delete reply

  return router;
}

module.exports = connectToDb;