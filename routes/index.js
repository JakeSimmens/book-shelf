//const {createMongoAPI, insert, findById, findMany, deleteOne} = require("../database.js");
const {createMongoAPI} = require("../database.js");

const express = require("express");
const router = express.Router();
const BOOKS_DATABASE = "books";
const USERS_DATABASE = "users";
const PASSWORD_DATABASE = "passwords";

const DATABASE = "jReads";
const BOOKS_COLLECTION = "books";

let MAX_BOOKS_PER_SHELF = 5;
let booksDB = createMongoAPI(DATABASE, BOOKS_COLLECTION);

//index
router.get("/", (req, res) => {

    booksDB.findMany({},
        function renderLibraryPage(data)
        {
            res.render("home", {
                myLibrary: data,
                maxBooksPerShelf: MAX_BOOKS_PER_SHELF
            });
        });

});

router.get("/register", (req, res) => {
    res.render("register");
})

router.post("/register", (req, res) => {
    let user ={
        username: req.body.username,
    };

    
    //check username is available
    //add username to database
    //add password to database

    res.redirect("/");
});



router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = router;