const ObjectId = require("mongodb").ObjectId;

async function createMongoAPI(dbConnection, nameOfCollection){

    const db = dbConnection;
    const collection = db.collection(nameOfCollection);

    let insert = async function(newData, callback){
      //Input: a single object or an array of objects to insert
      let response;
      try {
          if(!newData.length){
              response = await collection.insertOne(newData);
          } else {
              response = await collection.insertMany(newData);
          }
          callback(null, response);
          
      } catch (err) {
          console.log("Error inserting: ", err);
          callback(err);
      }
    }

    let findById = function (id, callback){
      //Input: _id to search by
      try {
          collection.find(ObjectId(id)).toArray((errorFinding, items) => {
              if(errorFinding){
                  throw "Error thrown from findById";
              } 
              if(items[0]){
                  callback(null, items);
              } else {
                  callback(null, []);
              }
          });
      } catch (err) {
          console.log("dbapi findById error:", err);
          callback(err, []);
      }
    }

    let findOne = async function(term, callback){
      //Input:  object as a search term
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
      //Input:  object as a search term
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

    let addComment = async function(bookId, comment, callback){
      //Input:  _id to search by
      //Input:  commment object
      let query = {_id: ObjectId(bookId)};
      let update = { $push: comment};

      try {
          let response = await collection.updateOne(query, update);
          callback(null, response);
      } catch (err) {
          console.log("Error inserting comment: ", err);
          callback(err);
      }
    }

    let updateComment = async function(bookId, comment, callback){
      //Input:  _id to search by
      //Input:  commment object
      let query = {_id: ObjectId(bookId)};
      let valueToUpdate = {
        $set: {
          ["comments."+comment.id+".message"]: comment.message,
          ["comments."+comment.id+".date"]: comment.date,
          ["comments."+comment.id+".edited"]: comment.edited
        }
      };

      try {
          let response = await collection.updateOne(query, valueToUpdate);
          callback(null, response);

      } catch (err) {
          console.log("Error updating comment: ", err);
          callback(err);
      }
    }

    let deleteComment = async function(bookId, commentId, callback){
      //Input:  _id to search by
      //Input:  commment object

      let query = {_id: ObjectId(bookId)};
      let valueToUpdate = {
        $set: {["comments."+commentId+".deleted"]: true}
      };

      try {
          let response = await collection.updateOne(query, valueToUpdate);
          callback(null, response);

      } catch (err) {
          console.log("Error deleting comment: ", err);
          callback(err);
      }
    }

    let addUserBook = async function(username, bookId, callback){
      //Input: username to search for user
      //Input:  _id to search
      let query = {username: username};
      let idToAdd = {
        $push: {library: ObjectId(bookId)}
      };

      try {
          await collection.updateOne(query, idToAdd);
          callback(null);

      } catch (err) {
          console.log("Error adding user book to user library: ", err);
          callback(err);
      }
    }

    let deleteUserBook = async function(username, bookId, callback){
      //Input: username to search for user
      //Input:  _id to search
      let query = {username: username};
      let updateAction = { $pull: { library: ObjectId(bookId)}};

      try{
        let response = await collection.updateOne(query, updateAction);
        callback(null, response);
      } catch(err){
        console.log("Error deleting user book: ", err);
        callback(err);
      }
    }

    let deleteOne = async function (deleteID, callback){
      //Input:  _id to search
      try {
            let objId = new ObjectId(deleteID);

          let result = await collection.deleteOne({_id: objId});
          callback(null, result);
      } catch (err) {
          console.log("Error deleting book: ", err);
          callback(err);
      }
    }

    let clearDB = async function (callback){
      try {

          let result = await collection.deleteMany({});
          callback(null, result);
      } catch (err) {
          console.log("Error clearing database: ", err);
          callback(err);
      }
    }

    let publicAPI = {
        insert,
        findById,
        findOne,
        findMany,
        addUserBook,
        addComment,
        updateComment,
        deleteComment,
        deleteUserBook,
        deleteOne,
        clearDB
    };

    return publicAPI;
}

module.exports.createMongoAPI = createMongoAPI;
