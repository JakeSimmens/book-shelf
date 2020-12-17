const {createMongoAPI, insert, clearDB} = require("./database.js");

const DATABASE = "jReads";
const BOOKS_COLLECTION = "books";

let db = createMongoAPI(DATABASE, BOOKS_COLLECTION);

//DATABASE
function seed(){
    db.clearDB(populateDB);
}

function populateDB(){
    db.insert(books,
        () => {
            console.log("Database seeded");
        });
}

var books = [
    {
        title: "Jurassic Park",
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
    },
    {
        title: "The Lost World",
        subtitle: "JP Part 2",
        authors: ["One Bob", "Four Fred"],
        publisher: "What? Publishing House",
        publishedDate: "May 2018",
        description: "A Second book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus ligula leo. Morbi mattis diam vestibulum mi venenatis faucibus. Nullam nec euismod felis, a vulputate turpis. Nunc eget dui eget lorem mollis consectetur. Aliquam pharetra nunc vel eleifend sodales. Pellentesque eget ex ac nisl fringilla vulputate. Integer aliquam ultrices felis at elementum. Vestibulum libero massa, eleifend a libero et, auctor ultricies odio. Donec pretium tincidunt diam, et malesuada ex tincidunt sed.",
        pageCount: 450,
        categories: "romantic",
        averageRating: 2.1,
        ratingsCount: 589,
        imageLinks: {
            thumbnail: "/images/lostWorld.jpg",
            small: "/images/lostWorld.jpg"
        }
    },
    {
        title: "The Gunslinger",
        subtitle: "Another one",
        authors: ["One Bob"],
        publisher: "House of Books",
        publishedDate: "May 2018",
        description: "A third book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus ligula leo. Morbi mattis diam vestibulum mi venenatis faucibus. Nullam nec euismod felis, a vulputate turpis. Nunc eget dui eget lorem mollis consectetur. Aliquam pharetra nunc vel eleifend sodales. Pellentesque eget ex ac nisl fringilla vulputate. Integer aliquam ultrices felis at elementum. Vestibulum libero massa, eleifend a libero et, auctor ultricies odio. Donec pretium tincidunt diam, et malesuada ex tincidunt sed.",
        pageCount: 234,
        categories: "sleeper",
        averageRating: 2.3,
        ratingsCount: 45,
        imageLinks: {
            thumbnail: "/images/darkTower.jpg",
            small: "/images/darkTower.jpg"
        }
    }
];

module.exports.seed = seed;