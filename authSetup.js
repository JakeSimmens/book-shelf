const LocalStrategy  = require("passport-local").Strategy;
const bcrypt         = require("bcrypt");
const flash          = require("connect-flash");

let setupPassport = (passport, usersdbConnection) => {

  //PASSPORT AUTHENTICATION
  passport.use(new LocalStrategy(
    async function(username, password, done){
      await usersdbConnection.findOne({username: username},
        async function(err, user){
          if(err) {return done(err);}
          if(!user){
              return done(null, false, {message: "bad username"});
          }
          let match = await bcrypt.compare(password, user.password);
          if(!match){
              return done(null, false, {message: "bad password"});
          }
          //passes username to serializeUser
          return done(null, user.username);
        });
      }
  ));

  passport.serializeUser( function(user, callback){
    //passport saves the user in the session.  User only needs to be the username which is passsed from LocalStrategy
    callback(null, user);
  });

  passport.deserializeUser( function(username, callback){
    //uses username save in session to access user
    usersdbConnection.findOne({username: username}, (err, user) => {
      if(err){
          return callback(err);
      }
      //user.username is saved in req.user
      callback(null, user.username);
    });
  });
}

module.exports.setupPassportStrategy = setupPassport;