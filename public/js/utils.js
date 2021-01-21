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

