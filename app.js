const {seed}            = require("./seed.js");
const express           = require("express");
const app               = express();
const methodOverride    = require("method-override");
const session           = require("express-session");
const passport          = require("passport");
const LocalStrategy     = require("passport-local").Strategy;
const initDatabases     = require("./dbs");
const {createMongoAPI}  = require("./dbs/dbapi.js");
const flash             = require("connect-flash");

app.use(express.urlencoded({extended: true}));
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

//initialize databases
initDatabases().then( async databases => {
  console.log("databases initialized");

  let booksColl = await createMongoAPI(databases.jReads, "books");
  let usersColl = await createMongoAPI(databases.jReads, "users");
  //let commentsColl = await createMongoAPI(databases.jReads, "comments");

  //seed database
  //seed();

  const indexRoutes = require("./routes/index");
  const myBookRoutes = require("./routes/myBook");
  const findBookRoutes = require("./routes/findBook");
  app.use("/", indexRoutes(booksColl, usersColl));
  app.use("/myBook", myBookRoutes(booksColl));
  app.use("/findBook", findBookRoutes(booksColl));

  const port = process.env.PORT || 3000;
  app.server = app.listen(port, function startServer() {
      console.log("jReads running");
  });
});

module.exports = app;