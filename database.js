const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");
const JREADS_DB = "jReads";

let counter = 0;


//connect to database
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const mongoUrl = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/${JREADS_DB}?retryWrites=true&w=majority`;

function insertBook(bookData){
    MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
        assert.strictEqual(null, err);
    
        const db = client.db(JREADS_DB);
        db.collection('books').insertOne(bookData)
        .then(result => {
            console.log(`Added record for ${bookData.title}`);
            //console.log(result);
    
        })
        .catch(err => {
            console.log("*** E R R O R ***");
            console.log(err);
        })
        .finally( () => {
            counter++;
            client.close();
        });
    
    });
}










//write to database
var mongoCollection = function (collectionName="books"){

    var publicAPI = {

        insert(item){
            console.log('test me mongo function');
            // try{
            //     await client.connect();
            //     console.log("Connected to database");
            //     const db = client.db(DATABASE_NAME);
            //     const collection = db.collection(collectionName);  //should be books
            //     console.log(`insert: ${item.title}`);
            //     //await collection.insertOne(item);
            // } catch(err) {
            //     console.log(err);
            // } finally {
            //     await client.close();
            // }
        }
    }

    return publicAPI;
}



// async function runDB(){
//     try {
//         await client.connect();
//         console.log("conntected to database");
//         const db = client.db(dbName);

//         const collection = db.collection("books");

//         let book =     {
//             id: "abc123",
//             title: "The Book of One",
//             subtitle: "Prequel to Two",
//             authors: ["Bob Bill", "Ray Bob", "Tracy Fred"],
//             publisher: "Publishing House",
//             publishedDate: "July 2015",
//             description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus ligula leo. Morbi mattis diam vestibulum mi venenatis faucibus. Nullam nec euismod felis, a vulputate turpis. Nunc eget dui eget lorem mollis consectetur. Aliquam pharetra nunc vel eleifend sodales. Pellentesque eget ex ac nisl fringilla vulputate. Integer aliquam ultrices felis at elementum. Vestibulum libero massa, eleifend a libero et, auctor ultricies odio. Donec pretium tincidunt diam, et malesuada ex tincidunt sed.",
//             pageCount: 590,
//             categories: "adventure",
//             averageRating: 4.7,
//             ratingsCount: 14698,
//             imageLinks: {
//                 thumbnail: "/images/jurassicPark.jpg",
//                 small: "/images/jurassicPark.jpg"
//             }
//         };

//         await collection.insertOne(book);

//         let foundBook = await collection.findOne();

//         console.log(foundBook);
//     } catch(err){
//         console.log(err.stack);
//     } finally {
//         await client.close();
//     }
// }

//runDB();

module.exports.insertBook = insertBook;
