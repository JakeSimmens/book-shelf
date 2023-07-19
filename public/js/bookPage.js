const oneStarReview = document.querySelector(".one-star")
const twoStarReview = document.querySelector(".two-star")
const threeStarReview = document.querySelector(".three-star")
const fourStarReview = document.querySelector(".four-star")
const fiveStarReview = document.querySelector(".five-star")

oneStarReview.addEventListener("click", 
  function fillOneStar(){
    oneStarReview.textContent = "\u2605"
    twoStarReview.textContent = "\u2730"
    threeStarReview.textContent = "\u2730"
    fourStarReview.textContent = "\u2730"
    fiveStarReview.textContent = "\u2730"
  })

twoStarReview.addEventListener("click", 
  function fillOneStar(){
    oneStarReview.textContent = "\u2605"
    twoStarReview.textContent = "\u2605"
    threeStarReview.textContent = "\u2730"
    fourStarReview.textContent = "\u2730"
    fiveStarReview.textContent = "\u2730"
  })

threeStarReview.addEventListener("click", 
  function fillOneStar(){
    oneStarReview.textContent = "\u2605"
    twoStarReview.textContent = "\u2605"
    threeStarReview.textContent = "\u2605"
    fourStarReview.textContent = "\u2730"
    fiveStarReview.textContent = "\u2730"
  })

fourStarReview.addEventListener("click", 
  function fillOneStar(){
    oneStarReview.textContent = "\u2605"
    twoStarReview.textContent = "\u2605"
    threeStarReview.textContent = "\u2605"
    fourStarReview.textContent = "\u2605"
    fiveStarReview.textContent = "\u2730"
  })

fiveStarReview.addEventListener("click", 
  function fillOneStar(){
    oneStarReview.textContent = "\u2605"
    twoStarReview.textContent = "\u2605"
    threeStarReview.textContent = "\u2605"
    fourStarReview.textContent = "\u2605"
    fiveStarReview.textContent = "\u2605"
  })