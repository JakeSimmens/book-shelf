const {PASSPORT_SECRET} = require("../secrets");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
const {setupPassportStrategy} = require("../authSetup.js");

const MAX_BOOKS_PER_SHELF = 5;

router.use(passport.initialize());
router.use(passport.session());

let connectToDb = function(booksdbConnection, usersdbConnection){

  setupPassportStrategy(passport, usersdbConnection);

  router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });

  router.get("/", (req, res) => {
    res.render("splash");
  });

  router.get("/home", (req, res) => {
    if(req.user){
      usersdbConnection.findOne({username: req.user},
        async function(err, user){
          if(!user.library || err) {
            res.render("home", {
              myLibrary: [],
              maxBooksPerShelf: MAX_BOOKS_PER_SHELF,
              messages: req.flash("info")
            });
          } else {
            booksdbConnection.findMany({_id: { $in: user.library}},
              function renderLibraryPage(data){
                res.render("home", {
                  myLibrary: data,
                  maxBooksPerShelf: MAX_BOOKS_PER_SHELF,
                  messages: req.flash("info")
                });
            });
          }
        });
    } else {
      booksdbConnection.findMany({},
        function renderLibraryPage(data){
          res.render("home", {
            myLibrary: data,
            maxBooksPerShelf: MAX_BOOKS_PER_SHELF,
            messages: req.flash("info")
          });
      });
    }
  });

  router.get("/library", (req, res) => {
    booksdbConnection.findMany({},
      function renderLibraryPage(data){
        res.render("library", {
          library: data,
          maxBooksPerShelf: MAX_BOOKS_PER_SHELF,
          messages: req.flash("info")
        });
    });
  });

  return router;
}

module.exports = connectToDb;