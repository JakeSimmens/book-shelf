//const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");
const {seed} = require("./seed.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const LocalStrategy = require("passport-local");



app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

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