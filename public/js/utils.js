//DEBOUNCER
const debouncer = (callback, delay = 1000) => {
    let timeoutID;
    return (...args) => {
        //waits for input entry to pause before executing callback
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    };
};



document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
  
    // Check if there are any navbar burgers
    if (navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      navbarBurgers.forEach( burger => {
        burger.addEventListener('click', () => {
  
          // Get the target from the HTML "data-target" attribute 
          const menuItemsId = burger.dataset.target;
          const burgerDropDown = document.getElementById(menuItemsId);
          console.log(burgerDropDown);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          burger.classList.toggle('is-active');
          burgerDropDown.classList.toggle('is-active');
  
        });
      });
    }
  
  });