//const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");
const {seed} = require("./seed.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");



app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"))
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: "Rise of Skywalker is better than Last Jedi",
    resave: false,
    saveUninitialized: false
    //cookie: { secure: true }  //need to setup https
}));
app.use(flash());

//ROUTES
const indexRoutes = require("./routes/index");
const myBookRoutes = require("./routes/myBook");
const findBookRoutes = require("./routes/findBook");
app.use("/", indexRoutes);
app.use("/myBook", myBookRoutes);
app.use("/findBook", findBookRoutes);

//seed database
seed();




const port = process.env.PORT || 3000;
app.listen(port, function startServer() {
    console.log("jReads running");
});