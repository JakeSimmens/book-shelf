const middleware = require("../middleware");
const express = require("express");
const router = express.Router();

let connectToDb = function(dbConnection){
  router.get('/:id', (req, res) => {
    dbConnection.findById(req.params.id,
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
    dbConnection.deleteOne(req.params.id,
        function redirecToLibrary()
        {
            res.redirect("/");
        });
  });

  return router;
}

module.exports = connectToDb;