// const {NEWS_API_KEY} = require("../config.js");
// GET https://newsapi.org/v2/everything?q=Apple&from=2023-07-28&sortBy=popularity&apiKey=API_KEY

// var url = 'https://newsapi.org/v2/everything?' +
//           'q=Apple&' +
//           'from=2023-07-28&' +
//           'sortBy=popularity&' +
//           'apiKey=b91d2aa703564c6ea813689f8bb448a4';

const SEARCH_TERM = "books";
const SORT_BY = "popularity";
const SEARCH_IN = "";
const SOURCES = "";
const DOMAINS = "";
const LANGUAGE = "en";
const PAGE_SIZE = 5;
// const CURRENT_DATE = getFormatedDate();

function fetchNews(){
  console.log("Fetching News!!!")
  return ["Article 1:  Big", "Article 2:  Huge", "Article 3:  Boring"]
}


var url = 'https://newsapi.org/v2/everything?' +
          'domains=goodreads.com&' +
          `from=2023-08-01&` +
          'sortBy=popularity&' +
          'apiKey=b91d2aa703564c6ea813689f8bb448a4';

// var req = new Request(url);

// fetch(url)
//     .then(function(response) {
//         console.log(response.json());
//     })

// function getFormatedDate(){
//   let formattedDay = ""
//   let formattedMonth = ""
//   let formatedYear = ""

//   let today = Date.now()
//   let day = today.getDate();
//   let month = today.getMonth();
//   let year = toString(today.getYear());

//   if( day < 10){
//     formattedDay = `0${day}`;
//   } else {
//     formatedDay = `${day}`;
//   }
//   if( month < 10){
//     formattedMonth = `0${month}`;
//   } else {
//     formattedMonth = `${month}`;
//   }

//   return `${year}-${formattedMonth}-${formattedDay}`;
// }

if (!(typeof module === "undefined")) {
  exports.fetchNews = fetchNews;
}