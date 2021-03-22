const {PASSPORT_SECRET} = require("../secrets");
const middleware = require("../middleware");
const express = require("express");
const router = express.Router();
const passport = require("passport");
//const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const {setupPassportStrategy} = require("../authSetup.js");

const MAX_BOOKS_PER_SHELF = 5;
const saltRounds = 10;

router.use(session({
  secret: PASSPORT_SECRET,
  resave: false,
  saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

let connectToDb = function(booksdbConnection, usersdbConnection){

  setupPassportStrategy(passport, usersdbConnection);

  router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });

  /////////////////////////
  //ROUTES
  ///////////////

  router.get("/login", (req, res) => {
    res.render("login", {messages: req.flash("info")});
  });

  router.post("/login", passport.authenticate("local",
    {
      successRedirect: "/home",
      failureRedirect: "/login"
    }));

  router.get("/logout", middleware.isLoggedIn, (req, res) => {
    req.logOut();
    req.flash("info","You have logged out");
    res.redirect("/home");
  });

  router.get("/register", (req, res) => {
    res.render("register", {messages: req.flash("info")});
  })

  router.post("/register", (req, res) => {
    if(!req.body.username){
      req.flash("info", "Please enter a username to sign up.");
      res.redirect("/home");
    }

    let username = req.body.username;
    let pw = req.body.password;
    username = username.trim();
    
    usersdbConnection.findOne({username: username},
      function checkForNoMatch(err, data){
        if(data.username !== undefined){
          req.flash("info", `${data.username} already exists, please pick a different username.`);
          res.redirect("/login");
        } else {
          bcrypt.hash(pw, saltRounds, (err, hash)=>{
            if(err){
              req.flash("info", "Error signing up.  Please try again.")
              return res.redirect("/login");
            }

            usersdbConnection.insert({username: username, password: hash}, (userData) => {
              let user = userData.ops[0].username;
              req.login(user, (err)=>{
                if(err){
                  return next(err);
                }
                req.flash("info", "Thank you for joining jReads.  You are signed in to your account.");
                return res.redirect("/home");
              });
            });
          });
        }
      });
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