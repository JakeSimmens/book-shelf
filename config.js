if(!process.env){
  const {SESSION_SECRET, BASE_PATH, MONGO_PASSWORD, MONGO_USERNAME}  = require("./secrets.js");
}


module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  BASE_PATH: process.env.BASE_PATH || BASE_PATH,
  MONGO_USERNAME: process.env.MONGO_USERNAME || MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || MONGO_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET || SESSION_SECRET
}
