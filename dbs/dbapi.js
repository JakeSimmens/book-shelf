//const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
//const assert = require("assert");

async function createMongoAPI(dbConnection, nameOfCollection){

    const db = dbConnection;
    const collection = db.collection(nameOfCollection);
    //let isTestRun = false;


    // let setForTesting = function() {
    //     isTestRun = true;
    //     options = { useUnifiedTopology: false };
    // }


    let insert = async function(newData, callback){

      let response;

      try {
          if(!newData.length){
              response = await collection.insertOne(newData);
          } else {
              response = await collection.insertMany(newData);
          }

          //await dbConnection.close();
          callback(newData);

      } catch (err) {
          console.log("Error inserting: ", err);
      }
        
    }

    let findById = function (id, callback){
   
      try {
          collection.find(ObjectId(id)).toArray((errorFinding, items) => {
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
          let cursor = collection.find(term).limit(1);

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
          collection.find(term).toArray((err, items) => {
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

    let updateOne = async function(term, updates, callback){
      //term is key:value pair
      //updates object of key:vale pairs

      let response;
      let formattedUpdates = updates; //{ $set: updates};

      try {

          response = await collection.updateOne({ _id: ObjectId(term._id)}, formattedUpdates);

          callback(response);

      } catch (err) {
          console.log("Error inserting: ", err);
      }
        
    }

    let deleteOne = async function (deleteID, callback){
      
      try {
            let objId = new ObjectId(deleteID);

          let result = await collection.deleteOne({_id: objId});
          //await client.close();
          callback(result);
      } catch (err) {
          console.log("Error deleting book: ", err);
      }

    }

    let clearDB = async function (callback){

      try {

          let result = await collection.deleteMany({});
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
        updateOne,
        deleteOne,
        clearDB
    };

    return publicAPI;
}

module.exports.createMongoAPI = createMongoAPI;
