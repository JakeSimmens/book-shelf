<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">jReads</h1>

  <p align="center">
    Track and Discuss Your Books
    <br />
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="./public/images/bookAppHome.jpg">

Reading personal growth and fiction books have been a big part of my life.  Inspired by [goodreads](https://www.goodreads.com/), jReads is for multiple users to track and discuss books they are interested in.  Users may add books by browsing thru books in the current jReads database or by searching Google Book's vast selection of titles.  Each book has it's own comment section associated with it.

Areas of focus:

<ul>
  <li>Creating an API to interact with any database API</li>
  <li>User authentication</li>
  <li>Managing database resources</li>
  <li>Managing user comments</li>
  <li>Unit testing</li>
  <li>RESTful routes</li>
</ul>

Creating an abstract layer to interact with the database API and the jReads code was the step I was most excited about.  I went into it with the mindset of using MongoDB now and being able to swap it out with a SQL database in the future.  Building this additional layer enabled me to create a variety of different functions customized to the needs of application such as modifying user and book data.

Each book in a user's collection is stored in the local database while making it easy to add new titles to the collection thru Google Books.  The books and data are initially searched for and found using the Google Books API.  Any books a user adds to their own library are then saved to a separate database for easy reference in the future.


### Built With

* [JavaScript](https://www.ecma-international.org/technical-committees/tc39/)
* [Node.js](https://nodejs.org)
* [Express](https://expressjs.com)
* [Passport](http://passportjs.org)
* [MongoDB](https://mongodb.com)
* [Bulma](https://bulma.io)


## Challenges

### Pooling Connections
I discovered while learning MongoDB that many blogs teach you how to incorporate Mongo into your project, but they skim over how to optimize the performance.  Shortly after finishing the interface for the Mongo API, the opened connections to Mongo went sky high with low user traffic.  After a morning of research, I concluded that a connection pool was needed and went forward with the implementation.  I found that making this change reduced the number of connections and also increased the speed of the website.

### MondgoDB
Coming from a background with SQL, adjusting to Mongo's query selectors took some practice.  The most challenging aspect was figuring out how to access an element in an array that is embedded within a file.  Thankfully being comfortable digging through documentation for ideas and examples is the new norm and I found answers.


<!-- CONTACT -->
## Contact

Jake Simmens - [LinkedIn](https://linkedin.com/in/jakesimmens) - jake@jakesimmens.com

<!--Project Link: [http://jakesimmens.com](http://jakesimmens.com) -->



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Emerson Doyah](https://github.com/emerzonic) - Knowledge of testing
* [Othneil Drew](https://github.com/othneildrew/Best-README-Template) - Readme template
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Hash and salt
* [Jest](https://jestjs.io/) - testing
* [Connect-Flash](https://www.npmjs.com/package/connect-flash) - User notifications
