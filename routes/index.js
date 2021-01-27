const {createMongoAPI} = require("../database.js");
const {PASSPORT_SECRET} = require("../secrets");
const middleware = require("../middleware");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");

const DATABASE = "jReads";
const BOOKS_COLLECTION = "books";
const USERS_COLLECTION = "users";
const PASSWORD_COLLECTION = "passwords";

const MAX_BOOKS_PER_SHELF = 5;
const booksDB = createMongoAPI(DATABASE, BOOKS_COLLECTION);  //need to mock
const userDB = createMongoAPI(DATABASE, USERS_COLLECTION);
const passwordDB = createMongoAPI(DATABASE, PASSWORD_COLLECTION);
const saltRounds = 10;

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
            async function(err, user){
                if(err) {return done(err);}
                if(!user){
                    return done(null, false, {message: "Incorrect username"});
                }
                let match = await bcrypt.compare(password, user.password);
                if(!match){
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
        function renderLibraryPage(data){
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
                res.redirect("/login");
            } else {
                bcrypt.hash(pw, saltRounds, (err, hash)=>{
                    if(err){
                        return res.redirect("/login");
                    }
                    userDB.insert({username: username, password: hash}, (user) => {
                        req.login(user, (err)=>{
                            if(err){
                                return next(err);
                            }
                            return res.redirect("/");
                        });
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
    req.flash("You logged out");
    res.redirect("/");
});

module.exports = router;