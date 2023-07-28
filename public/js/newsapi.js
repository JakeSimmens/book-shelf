const {NEWS_API_KEY} = require("../config.js");
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
const CURRENT_DATE = getFormatedDate();



var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2023-07-28&' +
          'sortBy=popularity&' +
          'apiKey=' + NEWS_API_KEY;

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })

getFormatedDate(){
  let formattedDay = ""
  let formattedMonth = ""
  let formatedYear = ""

  let day = Date.getDate();
  let month = Date.getMonth();
  let year = toString(Date.getYear());

  if( day < 10){
    formattedDay = `0${day}`;
  } else {
    formatedDay = `${day}`;
  }
  if( month < 10){
    formattedMonth = `0${month}`;
  } else {
    formattedMonth = `${month}`;
  }

  return `${year}-${formattedMonth}-${formattedDay}`;
}