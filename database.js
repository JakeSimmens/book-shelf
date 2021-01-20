const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const assert = require("assert");

function createMongoAPI(database, collection){

    const DATABASE = database;
    const COLLECTION = collection;
    let isTestRun = false;

    let url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
    let options = { useUnifiedTopology: true };

    //FUNCTIONS

    let setForTesting = function() {
        isTestRun = true;
        options = { useUnifiedTopology: false };
    }

    let insert = function(newData, callback){

        MongoClient.connect(url, options, async (err, client) => {

            let response;
            const db = client.db(DATABASE);
            const collection = db.collection(COLLECTION);

            try {
                assert.strictEqual(null, err);
    
                if(!newData.length){
                    response = await collection.insertOne(newData);
                } else {
                    response = await collection.insertMany(newData);
                }
    
                await client.close();
                callback(response.result);
    
            } catch (err) {
                console.log("Error inserting: ", err);
            }
        });
    }

    let findById = function (id, callback){

        MongoClient.connect(url, options, (err, client) => {
            assert.strictEqual(null, err);
        
            const db = client.db(DATABASE);
            const collection = db.collection(COLLECTION);
    
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
        });
    }

    let findOne = function(term, callback){
    
        MongoClient.connect(url, options, async (err, client) => {
            assert.strictEqual(null, err);
        
            const db = client.db(DATABASE);
            const collection = db.collection(COLLECTION);
    
            try {
                let cursor = collection.find(term).limit(1);

                if(!cursor.hasNext()){
                    console.log(err);
                    throw err;
                } else {
                    let item = await cursor.next();
                    console.log("findOne item: ", item);
                    callback(err, item);
                }
                
            } catch (err) {
                console.log(err);
                callback(err, {});
            }
        });
    }

    let findMany = function(term, callback){
    
        MongoClient.connect(url, options, (err, client) => {
            assert.strictEqual(null, err);
        
            const db = client.db(DATABASE);
            const collection = db.collection(COLLECTION);
    
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
        });
    }

    let deleteOne = function (deleteID, callback){

        MongoClient.connect(url, options, async (err, client) => {

            const db = client.db(DATABASE);
            const collection = db.collection(COLLECTION);
            
            try {
                assert.strictEqual(null, err);

                let objId = new ObjectId(deleteID);
    
                let result = await collection.deleteOne({_id: objId});
                await client.close();
                callback(result);
            } catch (err) {
                console.log("Error deleting book: ", err);
            }
        });
    }

    let clearDB = function (callback){

        MongoClient.connect(url, options, async (err, client) => {

            const db = client.db(DATABASE);
            const collection = db.collection(COLLECTION);
            
            try {
                assert.strictEqual(null, err);

                let result = await collection.deleteMany({});
                await client.close();
                callback(result);
            } catch (err) {
                console.log("Error clearing database: ", err);
            }
        });
    }

    let publicAPI = {
        setForTesting,
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
