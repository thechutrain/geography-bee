// document on load
$(document).ready(displayCountries);

// Event Listener --> check if enter key was pressed
$("form").on("submit", function(e){
    e.preventDefault();
    // get user guess
    var userGuess = $("#guess").val().trim();

    // opt 1. get general matches & specific matches
    var matches_arr = findAnyMatch(userGuess);
    var match = findExactMatch(matches_arr, userGuess);
    
    // opt 2. skip general filter
    // var match = findExactMatch(countriesArray, userGuess);

    // if the match variable isn't empty, then push to foundCountries array
    if ($.isEmptyObject(match)) {
        // no country found :(
        alertUser(false, userGuess);
    } else {
        // a country was found! 
        // 1. add the country to foundCountries array
        foundCountries.push(match);
        // 2. remove that country from the original list
        removeCountry(match);
        // 3. clear form
        $("#guess").val("");
        // 4. alert user
        alertUser(true, match.Name);
        // 5. update display
        displayCountries();
    }
    
    // update stats
    // TO DO
});


/* ------------ findAnyMatches() ------------
* gets the user's guess, checks to see if either it matches exactly a country
* or if only one country comes back with that search
* @param {string} guess - the input guess of a country
* @return {array} countries - returns an array of countries
*/
function findAnyMatch(guess){
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

    // console.log(matches);
    return matches;
}; // closes checkForMatches

/* ------------ findExactMatch() ------------
* looks to see if any of the countries match exactly with its name or aka array elements
* @param {array} matchesArray - an array of countries
* @param {string} guess - user guess of countries
* @return {object} - will return the last perfect country object found
*/
function findExactMatch(matchesArr, guess){
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
}; // closes function()

/* ------------ removeCountry() ------------
*@param {object} country - the country object to remove
*/
function removeCountry(country){
    var index = -1;
    // 1. Get the index of the country in the countriesArray
    for (var i = 0; i < countriesArray.length; i++){
        if (countriesArray[i].Name === country.Name){
            index = i;
        }
    }
    // console.warn(index);
    // console.warn(countriesArray[index]);

    // 2. splice that country out
    // console.log(countriesArray.length);
    if (index !== -1){
        countriesArray.splice(index, 1);
        // console.log(countriesArray.length);
    }
};

/* ------------ alertUser() ------------
* updates the alert message, to let the user know if country was found or not
* @param {boolean} successBool - an array of countries
* @param {string} country - either user input if incorrect, or Country.Name
*/
function alertUser(successBool, country){
    if (successBool){
        // found alert
        var span = $("<span>").text("Found " + country);
        var div = $("<div>").addClass("alert alert-success text-center").attr("role", "alert"); 
        div.append(span);
    } 
    else {
        // not found alert 
        var span = $("<span>").text("Sorry, could not find " + country);
        var div = $("<div>").addClass("alert alert-danger text-center").attr("role", "alert");
        div.append(span);   
    }
    // append those divs
    $(".alerts-container").empty();
    $(".alerts-container").append(div);
}

