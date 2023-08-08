const {NEWS_API_KEY} = require("../config.js");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(NEWS_API_KEY);

const SEARCH_TERM = "fiction book review";
const SORT_BY = "popularity";
const SEARCH_IN = "";
const SOURCES = "";
const DOMAINS = "";
const LANGUAGE = "en";
const TOTAL_ARTICLES_SENT = 10;

let dateToday = new Date().getDate();
let currentNews = {
  date: dateToday,
  articles: []
}

async function fetchNews(){
  console.log("Fetching News!!!")
  console.log("from: ", getFormatedDate())
  console.log("to: ", getOneWeekAgoDate())

  if(currentNews.articles.length > 0 && new Date().getDate() === currentNews.date){
    console.log("Accessing Saved articles");
    return [...currentNews.articles]
  }

  console.log("Retrieving new articles");

  return newsapi.v2.everything({
    q: SEARCH_TERM,
    from: getOneWeekAgoDate(),
    to: getFormatedDate(),
    language: LANGUAGE,
    sortBy: SORT_BY
  }).then( response => {
    // console.log("STATUS:",response.status)
    // console.log("Total Results:", response.totalResults)
    // console.log("Articles[]: ", response.articles[0])
    // console.log(response)

    currentNews.articles = []
    for(let i=0; i < response.articles.length && i < TOTAL_ARTICLES_SENT; i++){
      currentNews.articles.push(formatNewsData(response.articles[i]));
    }
    return [...currentNews.articles]
  })
}

function formatNewsData(article){
  return {
    author: article.author,
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage
  }
}

//FORMAT DATE FUNCTIONS

function getFormatedDate(){
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  return formatDate(day, month, year);
}

function getOneWeekAgoDate(){
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  if(day > 7){
    day = day - 7;
  } else {
    month--;
    if( month === 0){
      month = 12;
      year--;
    }
    if(month === 2){
      day = 21 + day
    } else {
      day = 23 + day
    }
  }

  return formatDate(day, month, year);
}

function formatDate(day, month, year){
  let formattedDay = ""
  let formattedMonth = ""

  if( day < 10){
    formattedDay = `0${day}`;
  } else {
    formattedDay = `${day}`;
  }
  if( month < 10){
    formattedMonth = `0${month}`;
  } else {
    formattedMonth = `${month}`;
  }

  return `${year}-${formattedMonth}-${formattedDay}`;
}

if (!(typeof module === "undefined")) {
  exports.fetchNews = fetchNews;
}