const {PASSPORT_SECRET} = require("../secrets");
const middleware = require("../middleware");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

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

  //PASSPORT AUTHENTICATION
  passport.use(new LocalStrategy(
    async function(username, password, done){
      await usersdbConnection.findOne({username: username},
        async function(err, user){
          if(err) {return done(err);}
          if(!user){
              return done(null, false, {message: "Incorrect username"});
          }
          let match = await bcrypt.compare(password, user.password);
          if(!match){
              return done(null, false, {message: "Incorrect password"});
          }
          //passes username to serializeUser
          return done(null, user.username);
        });
      }
  ));

  passport.serializeUser( function(user, callback){
    //passport saves the user in the session.  User only needs to be the username which is passsed from LocalStrategy
    callback(null, user);
  });

  passport.deserializeUser( function(username, callback){
    //uses username save in session to access user
    usersdbConnection.findOne({username: username}, (err, user) => {
      if(err){
          return callback(err);
      }
      //user.username is saved in req.user
      callback(null, user.username);
    });
  });

  router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    //res.locals.error = req.flash("error");  //error refers to ejs code
    //res.locals.success = req.flash("success");  //success refers to ejs code
    next();
  });

  /////////////////////////
  //ROUTES
  ///////////////

  router.get("/", (req, res) => {
    res.render("splash");
  });

  //index
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
                console.log("books found: ", data.length);
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

  return router;
}

module.exports = connectToDb;