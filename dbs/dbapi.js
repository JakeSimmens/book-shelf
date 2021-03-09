const {MONGO_USERNAME, MONGO_PASSWORD} = require("../secrets.js");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const assert = require("assert");

async function createMongoAPI(dbConnection, collection){

    const DB = dbConnection;
    const COLLECTION = DB.collection(collection);
    let isTestRun = false;


    // let setForTesting = function() {
    //     isTestRun = true;
    //     options = { useUnifiedTopology: false };
    // }


    // let insert = async function(newData, callback){

    //   let response;
    //   const db = dbConnection.db(DB);
    //   const collection = db.collection(COLLECTION);

    //   try {
    //       assert.strictEqual(null, err);

    //       if(!newData.length){
    //           response = await collection.insertOne(newData);
    //       } else {
    //           response = await collection.insertMany(newData);
    //       }

    //       //await dbConnection.close();
    //       callback(newData);

    //   } catch (err) {
    //       console.log("Error inserting: ", err);
    //   }
        
    // }

    let findById = function (id, callback){

            // const db = client.db(DB);
            // const collection = db.collection(COLLECTION);
    
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

    // let findOne = function(term, callback){
    
    //     MongoClient.connect(url, options, async (err, client) => {
    //         assert.strictEqual(null, err);
        
    //         const db = client.db(DB);
    //         const collection = db.collection(COLLECTION);
    
    //         try {
    //             let cursor = collection.find(term).limit(1);

    //             if(!cursor.hasNext()){
    //                 throw err;
    //             } else {
    //                 let item = await cursor.next();
    //                 callback(err, item);
    //             }
                
    //         } catch (err) {
    //             callback(err, {});
    //         }
    //     });
    // }

    // let findMany = function(term, callback){
    
    //     MongoClient.connect(url, options, (err, client) => {
    //         assert.strictEqual(null, err);
        
    //         const db = client.db(DB);
    //         const collection = db.collection(COLLECTION);
    
    //         try {
    //             collection.find(term).toArray((err, items) => {
    //                 if(err){
    //                     console.log(err);
    //                     throw err;
    //                 }
    //                 callback(items);
    //             });
    //         } catch (err) {
    //             console.log(err);
    //             callback([]);
    //         }
    //     });
    // }

    let deleteOne = async function (deleteID, callback){



            // const db = client.db(DB);
            // const collection = db.collection(COLLECTION);
            
            try {
                 let objId = new ObjectId(deleteID);
    
                let result = await COLLECTION.deleteOne({_id: objId});
                //await client.close();
                callback(result);
            } catch (err) {
                console.log("Error deleting book: ", err);
            }

    }

    // let clearDB = function (callback){

    //     MongoClient.connect(url, options, async (err, client) => {

    //         const db = client.db(DB);
    //         const collection = db.collection(COLLECTION);
            
    //         try {
    //             assert.strictEqual(null, err);

    //             let result = await collection.deleteMany({});
    //             await client.close();
    //             callback(result);
    //         } catch (err) {
    //             console.log("Error clearing database: ", err);
    //         }
    //     });
    // }

    let publicAPI = {
        //setForTesting,
        //insert,
        findById,
        //findOne,
        //findMany,
        deleteOne
        //clearDB
    };

    return publicAPI;
}

module.exports.testCreateMongoAPI = createMongoAPI;
