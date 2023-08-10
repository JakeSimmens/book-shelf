// console.log("NODE_ENV value: ", process.env.NODE_ENV)
if(process.env.NODE_ENV === undefined){
  console.log("Accessing secrets.js");
  const {SESSION_SECRET, MONGO_PASSWORD, MONGO_USERNAME, NEWS_API_KEY}  = require("./secrets.js");

  module.exports = {
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_USERNAME: process.env.MONGO_USERNAME || MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || MONGO_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET || SESSION_SECRET,
    NEWS_API_KEY: process.env.NEWS_API_KEY || NEWS_API_KEY
  }
} else {
  console.log("Accessing process.env variables.")
  module.exports = {
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_USERNAME: process.env.MONGO_USERNAME || MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || MONGO_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET || SESSION_SECRET,
    NEWS_API_KEY: process.env.NEWS_API_KEY || NEWS_API_KEY
  }
}



