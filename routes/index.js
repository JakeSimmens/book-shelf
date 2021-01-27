const {createMongoAPI} = require("../database.js");
const {PASSPORT_SECRET} = require("../secrets");
const middleware = require("../middleware");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const DATABASE = "jReads";
const BOOKS_COLLECTION = "books";
const USERS_COLLECTION = "users";
const PASSWORD_COLLECTION = "passwords";

let MAX_BOOKS_PER_SHELF = 5;
let booksDB = createMongoAPI(DATABASE, BOOKS_COLLECTION);  //need to mock
let userDB = createMongoAPI(DATABASE, USERS_COLLECTION);
let passwordDB = createMongoAPI(DATABASE, PASSWORD_COLLECTION);

//PASSPORT AUTHENTICATION
router.use(session({
    secret: PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(
    function(username, password, done){
        userDB.findOne({username: username},
            function(err, user){
                if(err) {return done(err);}
                if(!user){
                    return done(null, false, {message: "Incorrect username"});
                }
                if(user.password != password){
                    return done(null, false, {message: "Incorrect password"});
                }
                return done(null, user);
            }
        );
    }
));

passport.serializeUser( function(user, callback){
    //passport saves this in the session
    callback(null, user.username);
});

passport.deserializeUser( function(username, callback){
    //uses what is saved in the session earlier to access user
    userDB.findOne({username: username}, (err, user) => {
        if(err){
            return callback(err);
        }
        callback(null, user.username);
    });
});

router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    //res.locals.error = req.flash("error");  //error refers to ejs code
    //res.locals.success = req.flash("success");  //success refers to ejs code
    next();
});

//index
router.get("/", (req, res) => {
    req.flash("info", "welcome");
    booksDB.findMany({},
        function renderLibraryPage(data)
        {
            res.render("home", {
                myLibrary: data,
                maxBooksPerShelf: MAX_BOOKS_PER_SHELF,
                message: req.flash("info")
            });
        });
});

router.get("/register", (req, res) => {
    res.render("register");
})

router.post("/register", (req, res) => {
    if(!req.body.username){
        res.redirect("/");
    }

    let username = req.body.username;
    let pw = req.body.password;
    username = username.trim();
    
    userDB.findOne({username: username},
        function checkForNoMatch(err, data){
            if(data.username !== undefined){
                console.log("Acccount already exists");
                res.redirect("/login");
            } else {
            //create account
                console.log("user not found, creating account now");
                userDB.insert({username: username, password: pw}, (user) => {
                    console.log("user Added to DB", user);
                    //can auto log in here
                    passport.authenticate("local", 
                        {
                            successRedirect: "/",
                            failureRedirect: "/login"
                        });
                });

            }
        });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }));

router.get("/logout", middleware.isLoggedIn, (req, res) => {
    req.logOut();
    console.log("logged out");
    req.flash("You logged out");
    res.redirect("/");
});

module.exports = router;