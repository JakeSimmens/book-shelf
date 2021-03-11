let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    console.log("Not logged in");
    res.redirect("/login");
}

//Get date and time
middlewareObj.getDateAndTime = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let zero = minutes < 10 ? 0 : "";//if(minutes < 10){
 
  return `${month}/${day}/${year}  ${hours}:${zero}${minutes}`;
} 

module.exports = middlewareObj;