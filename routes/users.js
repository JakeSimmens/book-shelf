// const {BASE_PATH} = require("../secrets");
const {BASE_PATH}  = require("../config.js");
const middleware = require("../middleware");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;


let connectToDb = function(usersdbConnection){

  router.get("/login", (req, res) => {
    res.render("login", {messages: req.flash("info")});
  });

  router.post("/login", passport.authenticate("local",
    {
      successRedirect: '/',
      failureRedirect: '/users/login',
      successFlash: true,
      failureFlash: true
    }));

  router.get("/logout", middleware.isLoggedIn, (req, res) => {
    req.logOut((err) => {
      if(err){
        req.flash("info","Unable to logout.");
        res.redirect('/');
      }
    });
    req.flash("info","You have logged out");
    res.redirect('/');
  });

  router.get("/register", (req, res) => {
    res.render("register", {messages: req.flash("info")});
  })

  router.post("/register", (req, res) => {
    if(!req.body.username){
      req.flash("info", "Please enter a username to sign up.");
      res.redirect('/');
    }

    let username = req.body.username;
    let pw = req.body.password;
    username = username.trim();
    
    usersdbConnection.findOne({username: username},
      function checkForNoMatch(err, data){
        if(data.username !== undefined){
          req.flash("info", `${data.username} already exists, please pick a different username.`);
          res.redirect(`/users/login`);
        } else {
          bcrypt.hash(pw, saltRounds, (err, hash)=>{
            if(err){
              req.flash("info", "Error signing up.  Please try again.")
              return res.redirect(`/users/login`);
            }

            usersdbConnection.insert({username: username, password: hash}, (err, userData) => {
              if(err){
                req.flash("info", "Unable to add user.");
                return res.redirect(`/users/register`);
              }
              let user = userData.ops[0].username;
              req.login(user, (err)=>{
                if(err){
                  return next(err);
                }
                req.flash("info", "Thank you for joining jReads.  You are signed in to your account.");
                return res.redirect(`/`);
              });
            });
          });
        }
      });
  });

  return router;
}

module.exports = connectToDb;