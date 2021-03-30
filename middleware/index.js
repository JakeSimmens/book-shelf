// const {BASE_PATH}  = require("../secrets.js");
const {BASE_PATH}  = require("../config.js");
let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("info", "Please log in first.");
    res.redirect(`${BASE_PATH}/login`);
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

middlewareObj.formatBookDataFromGoogle = (data) => {

  let extractedData = {};
  extractedData.id = data.id;
  extractedData.title = data.volumeInfo.title;
  extractedData.subtitle = data.volumeInfo.subtitle;
  extractedData.authors = data.volumeInfo.authors;
  extractedData.publisher = data.volumeInfo.publisher;
  extractedData.publishedDate = data.volumeInfo.publishedDate;
  extractedData.description = data.volumeInfo.description;
  extractedData.pageCount = data.volumeInfo.pageCount;
  extractedData.categories = data.volumeInfo.categories;
  extractedData.averageRating = data.volumeInfo.averageRating;
  extractedData.ratingsCount = data.volumeInfo.ratingsCount;
  extractedData.imageLinks = data.volumeInfo.imageLinks;

  return extractedData;
}

module.exports = middlewareObj;