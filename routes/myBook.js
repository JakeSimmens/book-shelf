const {insert, findById, findMany, deleteOne} = require("../database.js");

const express = require("express");
const router = express.Router();
const BOOKS_DATABASE = "books";

//show my library book
router.get('/:id', (req, res) => {

    findById(req.params.id, function renderBookPage(data){
        if(data.length == 0){
            res.redirect("/");
        } else {
            res.render("book", {
                bookData: data[0],
                inMyLibrary: true
             });
        }
    }, BOOKS_DATABASE);
});


//delete
router.delete('/:id', (req, res) => {

    deleteOne(
        req.params.id, 
        function redirecToLibrary()
        {
            res.redirect("/");
        },
        BOOKS_DATABASE);

});

module.exports = router;