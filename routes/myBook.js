const {createMongoAPI} = require("../database.js");

const express = require("express");
const router = express.Router();
const BOOKS_DATABASE = "books";

const DATABASE = "jReads";
const BOOKS_COLLECTION = "books";

let db = createMongoAPI(DATABASE, BOOKS_COLLECTION);

//show my library book
router.get('/:id', (req, res) => {

    db.findById(req.params.id,
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


//delete
router.delete('/:id', (req, res) => {

    db.deleteOne(req.params.id,
        function redirecToLibrary()
        {
            res.redirect("/");
        });

});

module.exports = router;