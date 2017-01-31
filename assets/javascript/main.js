// alert("testing if refs properly");

// Event Listener --> check if enter key was pressed
$(document).on("keydown", function(e){
    if (e.key === "Enter" || e.keyCode === 13){
        console.log("enter was pressed");
        // call check country 
        checkUserGuess(false) ? countryFound() : countryNotFound();
    }
});

function checkUserGuess(guess){
    if (guess){
        return true;
    } else {
        return false;
    }
    // 1. declare vars & get the user guess

    // 2. filter the array with the user's guess
        // i. make regex
        // ii. check if they match
    
    // 3. if there is only one match, then found is true

    // 4. Get that country and splice it out of original array --> found array
};

function countryFound(){
    console.log("country found");
}

function countryNotFound(){
    console.log("country not found");
}