const {insert, findById, findMany, deleteOne} = require("../database.js");

const express = require("express");
const router = express.Router();

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
    });
});


//delete
router.delete('/:id', (req, res) => {

    deleteOne(req.params.id, function redirecToLibrary(){
        res.redirect("/");
    });

});

module.exports = router;