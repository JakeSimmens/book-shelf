const {insert, findById, findMany, deleteOne} = require("../database.js");

const express = require("express");
const router = express.Router();

let MAX_BOOKS_PER_SHELF = 5;

//index
router.get('/', (req, res) => {

    findMany({}, function renderLibraryPage(data){
        res.render("home", {
            myLibrary: data,
            maxBooksPerShelf: MAX_BOOKS_PER_SHELF
        });
    });

});

router.get('/register', (req, res) => {
    res.render("register");
})

router.get('/login', (req, res) => {
    res.render("login");
});

module.exports = router;