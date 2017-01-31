// alert("testing if refs properly");

// Event Listener --> check if enter key was pressed
$("form").on("submit", function(e){
    e.preventDefault();
    // get user guess
    var userGuess = $("#guess").val().trim();
    // get an array of matches - general matches of name & aka
    var matches_arr = checkGeneralMatches(userGuess);
    var match = checkExactMatches(matches_arr, userGuess);
    console.log(match);
});


/* ------------ checkUserGuess() ------------
* gets the user's guess, checks to see if either it matches exactly a country
* or if only one country comes back with that search
* @return {array} countries - returns an array of countries
*/
function checkGeneralMatches(guess){
    // 1. declare vars & get user guess
    var re = new RegExp(guess, "gi");

    // 2. filter the array with the user's guess
    var matches = countriesArray.filter(function(country){
        var aka = false;
        // loop through aka array of country to see if there's a match
        if (country.hasOwnProperty("aka")){
            country.aka.forEach(function(altName){
                if (altName.match(re)){
                    aka = true;
                }
            })
        };
        return country.Name.match(re) || aka;
    })

    console.log(matches);
    return matches;
}; // closes checkForMatches

/* takes the user guess & matches array
* looks to see if any of the countries match exactly
* @return {object} - will return the last perfect country object found
*/
function checkExactMatches(matchesArr, guess){
    var perfectMatchFound = false;
    var perfectMatchObj;

    // loop through the array
    matchesArr.forEach(function(country){
        // check if name is equal
        if (country.Name.toLowerCase() == guess.toLowerCase()){
            perfectMatchFound = true;
            perfectMatchObj = country;
        };

        if (country.hasOwnProperty("aka")){
          // loop through aka & check if aka's are equal
            country.aka.forEach(function(name){
                if (name.toLowerCase() === guess.toLowerCase()){
                    perfectMatchFound = true;
                    perfectMatchObj = country;
                }
            }) // forEach
        } // if of hasOwnProperty
    }); // closes forEach

    // return country if found as object, or empty object if not found
    return perfectMatchFound ? perfectMatchObj : {}; 
}