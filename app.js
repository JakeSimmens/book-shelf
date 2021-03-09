//const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");
const {seed} = require("./seed.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const initDatabases = require("./dbs");
const {testCreateMongoAPI} = require("./dbs/dbapi.js");
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
  //const myBookRoutes = require("./routes/myBook");
  const findBookRoutes = require("./routes/findBook").router;

  app.use("/", indexRoutes);
  //app.use("/myBook", myBookRoutes);
  app.use("/findBook", findBookRoutes);

  //seed database
  //seed();

//initialize databases
initDatabases().then( async databases => {
  console.log("databases initialized");

  let testdb = await testCreateMongoAPI(databases.jReads, "books");
  console.log("testdb: ", testdb);
  

  //mybook
  //show my library book
  app.get('/myBook/:id', (req, res) => {
    testdb.findById(req.params.id,
        function renderBookPage(data){
          console.log("in new code");
            if(data.length == 0){
                res.redirect("/");
            } else {
                res.render("book", {
                    bookData: data[0],
                    inMyLibrary: true
                    });
            }
        });
  });

  //delete
  app.delete('/myBook/:id', (req, res) => {
    testdb.deleteOne(req.params.id,
        function redirecToLibrary()
        {
            res.redirect("/");
        });
  });


  const port = process.env.PORT || 3000;
  app.server = app.listen(port, function startServer() {
      console.log("jReads running");
  });
});



module.exports = app;