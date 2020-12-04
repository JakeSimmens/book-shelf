const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");
const DATABASE_NAME = "jReads";
const mongoUrl = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

const {MongoClient} = require("mongodb");
const client = new MongoClient(mongoUrl);
const dbName = "jReads";

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

module.exports.mongoCollection = mongoCollection;
