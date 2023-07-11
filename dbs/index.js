//Initialize databases

// const {MONGO_USERNAME, MONGO_PASSWORD} = require("../secrets.js");
const {MONGO_USERNAME, MONGO_PASSWORD} = require("../config.js");
const MongoClient = require('mongodb').MongoClient;
const JREADS_DB = "jReads";

const jReadsUrl = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/${JREADS_DB}?retryWrites=true&w=majority`;
// const jReadsUrl = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/${JREADS_DB}?retryWrites=true&w=majority`;
//
// new connection string as of 7/11/23 ****  mongodb+srv://jsimmens:<password>@jreads.ccxgi.mongodb.net/?retryWrites=true&w=majority


function connect(url) {
  let options = { useUnifiedTopology: true };
  return MongoClient.connect(url, options).then(client => client.db())
}
 
module.exports = async function() {

  let databases = await Promise.all([connect(jReadsUrl)]);

  return {
    jReads: databases[0]
  }

}