const {MONGO_USERNAME, MONGO_PASSWORD} = require("../secrets.js");
const MongoClient = require('mongodb').MongoClient;

const JREADS_DB = "jReads";
//const TEST_DB = "test";

const JREADS_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/${JREADS_DB}?retryWrites=true&w=majority`;
//const TEST_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/${TEST_DB}?retryWrites=true&w=majority`;

function connect(url) {
  let options = { useUnifiedTopology: true };
  return MongoClient.connect(url, options).then(client => client.db())
}
 
module.exports = async function() {
  let databases = await Promise.all([connect(JREADS_URL)]);
 
  return {
    jReads: databases[0]
  }
}