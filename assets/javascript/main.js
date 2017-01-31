// alert("testing if refs properly");

// Event Listener --> check if enter key was pressed
$("form").on("submit", function(e){
    e.preventDefault();
    var countryMatchesArray = checkUserGuess();
    countryMatchesArray.length === 1 ? countryFound() : countryNotFound();
});

/* ------------ checkUserGuess() ------------
* gets the user's guess, checks to see if either it matches exactly a country
* or if only one country comes back with that search
* @return {array} countries - returns an array of countries
*/
function checkUserGuess(){
    // 1. declare vars & get user guess
    var countryGuess = $("#guess").val().trim();
    var re = new RegExp(countryGuess, "gi");
    var perfectMatch = false; // handle weird exceptions like below
    var countryFound;

    // 2. filter the array with the user's guess
    var matches = countriesArray.filter(function(country){
        // check if theres an exact match
        if (country.Name.toLowerCase() === countryGuess.toLowerCase()){
            perfectMatch = true;
            countryFound = country;
        }
        return country.Name.match(re);
    })

    // 3. check if a perfect match was found
    if (perfectMatch){
        console.log("Found Perfect Match:" );
        console.log(countryFound);
        return [countryFound]; // one country object in an array
    }  else {
        return matches;
    }
};

function countryFound(){
    console.log("country found");
}

function countryNotFound(){
    console.log("country not found");
}