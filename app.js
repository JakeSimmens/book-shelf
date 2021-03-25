const {SESSION_SECRET}  = require("./secrets.js");
const {seed}            = require("./seed.js");
const flash             = require("connect-flash");
const express           = require("express");
const app               = express();
const methodOverride    = require("method-override");
const session           = require("express-session");
const passport          = require("passport");
const initDatabases     = require("./dbs");
const {createMongoAPI}  = require("./dbs/dbapi.js");

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"))
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


//initialize databases
initDatabases().then( async databases => {
  console.log("databases initialized");

  let booksColl = await createMongoAPI(databases.jReads, "books");
  let usersColl = await createMongoAPI(databases.jReads, "users");

  const indexRoutes = require("./routes/index");
  const usersRoutes = require("./routes/users");
  const myBookRoutes = require("./routes/myBook");
  const findBookRoutes = require("./routes/findBook");
  const commentRoutes = require("./routes/comments")
  app.use("/", indexRoutes(booksColl, usersColl));
  app.use("/users", usersRoutes(usersColl));
  app.use("/findBook", findBookRoutes(booksColl, usersColl));
  app.use("/myBook", myBookRoutes(booksColl, usersColl));
  app.use("/myBook/:id/comments", commentRoutes(booksColl, usersColl));

  const port = process.env.PORT || 3000;
  app.server = app.listen(port, function startServer() {
      console.log("jReads running");
  });
});

module.exports = app;