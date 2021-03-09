//const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
//const assert = require("assert");

async function createMongoAPI(dbConnection, collection){

    const DB = dbConnection;
    const COLLECTION = DB.collection(collection);
    //let isTestRun = false;


    // let setForTesting = function() {
    //     isTestRun = true;
    //     options = { useUnifiedTopology: false };
    // }


    let insert = async function(newData, callback){

      let response;

      try {
          if(!newData.length){
              response = await COLLECTION.insertOne(newData);
          } else {
              response = await COLLECTION.insertMany(newData);
          }

          //await dbConnection.close();
          callback(newData);

      } catch (err) {
          console.log("Error inserting: ", err);
      }
        
    }

    let findById = function (id, callback){
   
      try {
          COLLECTION.find(ObjectId(id)).toArray((errorFinding, items) => {
              if(errorFinding){
                  console.log(errorFinding);
                  throw "Error thrown from findById";
              } 
              if(items[0]){
                  callback(items);
              } else {
                  callback([]);
              }
          });
      } catch (err) {
          console.log(err);
          callback([]);
      }

    }

    let findOne = async function(term, callback){
    
      try {
          let cursor = COLLECTION.find(term).limit(1);

          if(!cursor.hasNext()){
              throw err;
          } else {
              let item = await cursor.next();
              callback(null, item);
          }
          
      } catch (err) {
          callback(err, {});
      }
    }

    let findMany = function(term, callback){
    
      try {
          COLLECTION.find(term).toArray((err, items) => {
              if(err){
                  console.log(err);
                  throw err;
              }
              callback(items);
          });
      } catch (err) {
          console.log(err);
          callback([]);
      }
    }

    let deleteOne = async function (deleteID, callback){
      
      try {
            let objId = new ObjectId(deleteID);

          let result = await COLLECTION.deleteOne({_id: objId});
          //await client.close();
          callback(result);
      } catch (err) {
          console.log("Error deleting book: ", err);
      }

    }

    let clearDB = async function (callback){

      try {

          let result = await COLLECTION.deleteMany({});
          //await client.close();
          callback(result);
      } catch (err) {
          console.log("Error clearing database: ", err);
      }

    }

    let publicAPI = {
        //setForTesting,
        insert,
        findById,
        findOne,
        findMany,
        deleteOne,
        clearDB
    };

    return publicAPI;
}

module.exports.createMongoAPI = createMongoAPI;
