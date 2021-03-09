//const {createMongoAPI} = require("../database.js");
const middleware = require("../middleware");
const express = require("express");
const router = express.Router();

// const DATABASE = "jReads";
// const BOOKS_COLLECTION = "books";

// let db = createMongoAPI(DATABASE, BOOKS_COLLECTION);

let dbSetupForRoutes = function(dbConnection){
  router.get('/:id', (req, res) => {
    console.l
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

//show my library book
// router.get('/:id', (req, res) => {
//     db.findById(req.params.id,
//         function renderBookPage(data){
//             if(data.length == 0){
//                 res.redirect("/");
//             } else {
//                 res.render("book", {
//                     bookData: data[0],
//                     inMyLibrary: true
//                     });
//             }
//         });
// });

//delete
// router.delete('/:id', (req, res) => {
//     db.deleteOne(req.params.id,
//         function redirecToLibrary()
//         {
//             res.redirect("/");
//         });
// });

module.exports = dbSetupForRoutes;
//module.exports = router;