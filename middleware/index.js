let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        console.log("Currently logged in");
        return next();
    }
    console.log("Not logged in");
    res.redirect("/login");
}

module.exports = middlewareObj;