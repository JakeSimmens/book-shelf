const starCount = document.querySelector(".star-counter")
const starCountEdit = document.querySelector(".star-counter-edit")
const oneStarReview = document.querySelector(".one-star")
const twoStarReview = document.querySelector(".two-star")
const threeStarReview = document.querySelector(".three-star")
const fourStarReview = document.querySelector(".four-star")
const fiveStarReview = document.querySelector(".five-star")

if(oneStarReview){
  oneStarReview.addEventListener("click", 
  function fillOneStar(){
    oneStarReview.textContent = "\u2605"
    twoStarReview.textContent = "\u2729"
    threeStarReview.textContent = "\u2729"
    fourStarReview.textContent = "\u2729"
    fiveStarReview.textContent = "\u2729"
    starCount.value = 1
  })

twoStarReview.addEventListener("click", 
  function fillTwoStars(){
    oneStarReview.textContent = "\u2605"
    twoStarReview.textContent = "\u2605"
    threeStarReview.textContent = "\u2729"
    fourStarReview.textContent = "\u2729"
    fiveStarReview.textContent = "\u2729"
    starCount.value = 2
  })

threeStarReview.addEventListener("click", 
  function fillThreeStars(){
    oneStarReview.textContent = "\u2605"
    twoStarReview.textContent = "\u2605"
    threeStarReview.textContent = "\u2605"
    fourStarReview.textContent = "\u2729"
    fiveStarReview.textContent = "\u2729"
    starCount.value = 3
  })

fourStarReview.addEventListener("click", 
  function fillFourStars(){
    oneStarReview.textContent = "\u2605"
    twoStarReview.textContent = "\u2605"
    threeStarReview.textContent = "\u2605"
    fourStarReview.textContent = "\u2605"
    fiveStarReview.textContent = "\u2729"
    starCount.value = 4
  })

fiveStarReview.addEventListener("click", 
  function fillFiveStars(){
    oneStarReview.textContent = "\u2605"
    twoStarReview.textContent = "\u2605"
    threeStarReview.textContent = "\u2605"
    fourStarReview.textContent = "\u2605"
    fiveStarReview.textContent = "\u2605"
    starCount.value = 5
  })
}
