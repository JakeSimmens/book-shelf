const {MONGO_USERNAME, MONGO_PASSWORD} = require("./secrets.js");

const {MongoClient} = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
//const mongoPassword = "thinkbig3";
//const url = `mongodb+srv://jsimmens:${mongoPassword}@jreads.ccxgi.mongodb.net/jReads?retryWrites=true&w=majority`;

// const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/jReads?retryWrites=true&w=majority`;

// const client = new MongoClient(url);

// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");

//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }

// run().catch(console.dir);

//DATABASE SETUP

const mongoUrl = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@jreads.ccxgi.mongodb.net/jReads?retryWrites=true&w=majority`;
const client = new MongoClient(mongoUrl);

const dbName = "jReads";
async function runDB(){
    try {
        await client.connect();
        console.log("conntected to database");
        const db = client.db(dbName);

        const collection = db.collection("books");

        let book =     {
            id: "abc123",
            title: "The Book of One",
            subtitle: "Prequel to Two",
            authors: ["Bob Bill", "Ray Bob", "Tracy Fred"],
            publisher: "Publishing House",
            publishedDate: "July 2015",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus ligula leo. Morbi mattis diam vestibulum mi venenatis faucibus. Nullam nec euismod felis, a vulputate turpis. Nunc eget dui eget lorem mollis consectetur. Aliquam pharetra nunc vel eleifend sodales. Pellentesque eget ex ac nisl fringilla vulputate. Integer aliquam ultrices felis at elementum. Vestibulum libero massa, eleifend a libero et, auctor ultricies odio. Donec pretium tincidunt diam, et malesuada ex tincidunt sed.",
            pageCount: 590,
            categories: "adventure",
            averageRating: 4.7,
            ratingsCount: 14698,
            imageLinks: {
                thumbnail: "/images/jurassicPark.jpg",
                small: "/images/jurassicPark.jpg"
            }
        };

        await collection.insertOne(book);

        let foundBook = await collection.findOne();

        console.log(foundBook);
    } catch(err){
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

runDB();
