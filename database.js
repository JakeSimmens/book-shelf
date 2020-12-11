const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");
const JREADS_DB = "jReads";
const BOOKS_COLLECTION = "books";

//connect to database
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const mongoUrl = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/${JREADS_DB}?retryWrites=true&w=majority`;


//CREATE
function insert(data, callback = () => {}){
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, async (err, client) => {
        try {
            assert.strictEqual(null, err);
            const db = client.db(JREADS_DB);
            const collection = db.collection(BOOKS_COLLECTION);

            if(!data.length){
                await collection.insertOne(data);
            } else {
                await collection.insertMany(data);
            }

            await client.close();
            callback();

        } catch (err) {
            console.log("Error inserting: ", err);
        }
    });

}

//READ
function findById(findId, callback){
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
        assert.strictEqual(null, err);
    
        const db = client.db(JREADS_DB);
        const collection = db.collection(BOOKS_COLLECTION);
        collection.find({id: findId}).toArray((errorFinding, books) => {
            if(errorFinding){
                console.log(errorFinding);
                throw errorFinding;
            } 
            callback(books[0]);
        });

    });
}

//READ
function findMany(term, callback){
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
        assert.strictEqual(null, err);
    
        const db = client.db(JREADS_DB);
        const collection = db.collection(BOOKS_COLLECTION);
        collection.find(term).toArray((err, books) => {
            if(err){
                console.log(err);
                throw err;
            }
            callback(books);
        });
    });
}

//DESTROY
function clearDB(callback){
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, async (err, client) => {
        
        try {
            assert.strictEqual(null, err);
            const db = client.db(JREADS_DB);
            const collection = db.collection(BOOKS_COLLECTION);
            await collection.deleteMany({});
            await client.close();
            callback();
        } catch (err) {
            console.log("Error clearing database: ", err);
        }
    });
}


module.exports.insert = insert;
module.exports.findById = findById;
module.exports.findMany = findMany;
module.exports.clearDB = clearDB;
