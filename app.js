const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', function getHome(req, res) {
    //res.send("It's working!");
    console.log("Get home page");
    res.render("home");
});

const port = process.env.PORT || 3000;
app.listen(port, function startServer() {
    console.log("Book server is up and running");
});
