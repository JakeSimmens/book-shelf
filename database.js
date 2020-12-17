const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");

//connect to database
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const assert = require("assert");
const JREADS_DB = "jReads";
const BOOKS_COLLECTION = "books";

function createMongoAPI(database, collection){

    const DATABASE = database;
    const COLLECTION = collection;
    let isTestRun = false;

    let url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
    let options = { useUnifiedTopology: true };

    let setForTesting = function() {
        isTestRun = true;
        options = { useUnifiedTopology: false };
    }

    let insert = function(data, callback){

        MongoClient.connect(url, options, async (err, client) => {
            let response;
    
            try {
                assert.strictEqual(null, err);
                const db = client.db(DATABASE);
                const collection = db.collection(COLLECTION);
    
                if(!data.length){
                    response = await collection.insertOne(data);
                } else {
                    response = await collection.insertMany(data);
                }
    
                await client.close();
                callback(response.result);
    
            } catch (err) {
                console.log("Error inserting: ", err);
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

    let clearDB = function (callback){

        MongoClient.connect(url, options, async (err, client) => {
            
            try {
                assert.strictEqual(null, err);
                const db = client.db(DATABASE);
                const collection = db.collection(COLLECTION);
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
        findMany,
        clearDB
    };

    return publicAPI;

}

let dbInfo = {
    name: JREADS_DB,
    collection: BOOKS_COLLECTION,
    isTestRun: false
};

function setDatabaseToUse(dbChoice){

    let name = JREADS_DB;
    let isTestRun = false;
    let collection = "books";


    switch(dbChoice){
        case "books":
            collection = "books";
            break;
        case "users":
            collection = "users";
            break;
        case "passwords":
            collection = "passwords";
            break;
        case "comments":
            collection = "comments";
            break;
        case "test":
            name = "test"
            collection = "books";
            istTestRun = true;
            break;
    }

    return {
        name: name,
        collection: collection,
        isTestRun: isTestRun
    }
}

function setMongoURL(dbname){

    let url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/${dbname}?retryWrites=true&w=majority`;

    return url;
}

function setMongoOptions(isTest){
    //Running Jest test throws an error if useUnifiedTopology option is set to true

    if(isTest){
        return { useUnifiedTopology: false };
    } else {
        return { useUnifiedTopology: true };
    }
}

//CREATE
function insert(data, database, callback){

    let dbParams = setDatabaseToUse(database);
    let url = setMongoURL(dbParams.name);
    let options = setMongoOptions(dbParams.isTestRun);

    MongoClient.connect(url, options, async (err, client) => {
        let response;

        try {
            assert.strictEqual(null, err);
            const db = client.db(dbParams.name);
            const collection = db.collection(dbParams.collection);

            if(!data.length){
                response = await collection.insertOne(data);
            } else {
                response = await collection.insertMany(data);
            }

            await client.close();
            callback(response.result);

        } catch (err) {
            console.log("Error inserting: ", err);
        }
    });

}

//READ
function findById(id, database, callback){

    let dbParams = setDatabaseToUse(database);
    let url = setMongoURL(dbParams.name);
    let options = setMongoOptions(dbParams.isTestRun);

    MongoClient.connect(url, options, (err, client) => {
        assert.strictEqual(null, err);
    
        const db = client.db(dbParams.name);
        const collection = db.collection(dbParams.collection);

        try {
            collection.find(ObjectId(id)).toArray((errorFinding, books) => {
                if(errorFinding){
                    console.log(errorFinding);
                    throw "Error thrown from findById";
                } 
                if(books[0]){
                    callback(books);
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

function findOne(term, database, callback){

    let dbParams = setDatabaseToUse(database);
    let url = setMongoURL(dbParams.name);
    let options = setMongoOptions(dbParams.isTestRun);

    MongoClient.connect(url, options, (err, client) => {
        assert.strictEqual(null, err);
    
        const db = client.db(dbParams.name);
        const collection = db.collection(dbParams.collection);

        try {
            collection.find(term).toArray((errorFinding, items) => {
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

//READ
function findMany(term, database, callback){

    let dbParams = setDatabaseToUse(database);
    let url = setMongoURL(dbParams.name);
    let options = setMongoOptions(dbParams.isTestRun);

    MongoClient.connect(url, options, (err, client) => {
        assert.strictEqual(null, err);
    
        const db = client.db(dbParams.name);
        const collection = db.collection(dbParams.collection);

        try {
            collection.find(term).toArray((err, books) => {
                if(err){
                    console.log(err);
                    throw err;
                }
                callback(books);
            });
        } catch (err) {
            console.log(err);
            callback([]);
        }

    });
}

//DESTROY
function deleteOne(deleteID, database, callback){

    let dbParams = setDatabaseToUse(database);
    let url = setMongoURL(dbParams.name);
    let options = setMongoOptions(dbParams.isTestRun);

    MongoClient.connect(url, options, async (err, client) => {
        
        try {
            assert.strictEqual(null, err);
            const db = client.db(dbParams.name);
            const collection = db.collection(dbParams.collection);
            let objId = new ObjectId(deleteID);

            let result = await collection.deleteOne({_id: objId});
            await client.close();
            callback(result);
        } catch (err) {
            console.log("Error deleting book: ", err);
        }
    });
}

//DESTROY
function clearDB(database, callback){

    let dbParams = setDatabaseToUse(database);
    let url = setMongoURL(dbParams.name);
    let options = setMongoOptions(dbParams.isTestRun);

    MongoClient.connect(url, options, async (err, client) => {
        
        try {
            assert.strictEqual(null, err);
            const db = client.db(dbParams.name);
            const collection = db.collection(dbParams.collection);
            let result = await collection.deleteMany({});
            await client.close();
            callback(result);
        } catch (err) {
            console.log("Error clearing database: ", err);
        }
    });
}

module.exports.insert = insert;
module.exports.findById = findById;
module.exports.findMany = findMany;
module.exports.deleteOne = deleteOne;
module.exports.clearDB = clearDB;
module.exports.createMongoAPI = createMongoAPI;
