const {NEWS_API_KEY} = require("../config.js");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(NEWS_API_KEY);
// const fetch = require("node-fetch");

// GET https://newsapi.org/v2/everything?q=Apple&from=2023-07-28&sortBy=popularity&apiKey=API_KEY

// var url = 'https://newsapi.org/v2/everything?' +
//           'q=Apple&' +
//           'from=2023-07-28&' +
//           'sortBy=popularity&' +
//           'apiKey=b91d2aa703564c6ea813689f8bb448a4';

const SEARCH_TERM = "science fiction book review";
const SORT_BY = "popularity";
const SEARCH_IN = "";
const SOURCES = "";
const DOMAINS = "";
const LANGUAGE = "en";
// const CURRENT_DATE = getFormatedDate();

async function fetchNews(){
  console.log("Fetching News!!!")

  return newsapi.v2.everything({
    q: SEARCH_TERM,
    from: '2023-08-01',
    to: '2023-08-06',
    language: LANGUAGE,
    sortBy: SORT_BY
  }).then( response => {
    console.log("STATUS:",response.status)
    console.log("Total Results:", response.totalResults)
    console.log("Articles[]: ", response.articles)
    
    console.log(response)

    let articles = []
    for(let i=0; i < response.articles.length && i < 5; i++){
      articles.push(response.articles[i].title);
    }


    return [...articles]
    // return ["Article 1:  Big", "Article 2:  Huge", "Article 3:  Boring"]


  })



  
}

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