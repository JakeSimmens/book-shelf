const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', function getHome(req, res) {

    res.render("home");
});

//show
app.get('/book/:id', (req, res) => {
    //show a single book's details from google
    res.send("test");
});

const port = process.env.PORT || 3000;
app.listen(port, function startServer() {
    console.log("Book server is up and running");
});
