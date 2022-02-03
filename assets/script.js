// WHEN, the page loads
// THEN, I am presented with all of the words I have learned so far
// GIVEN, I am presented with a page with a drop down to choose a language
// WHEN, I choose a language from the drop down box and press the Go button
// THEN, the application displays a word in english and the chosen language, as well as the definition
// WHEN, I have generated a new word,
// THEN, The words I have previously learned will display on the page


// TODO: Assign variables from the DOM


// TODO: Assign other variables


// Init Function
function initFunction() {

// TODO: Fetch random word form random word API
fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "56e1ec2b89msh75f5a1bd9fbcbb6p150a7bjsnb6e951a5a987"
    }
})
.then(function(response) { 
	return response.json() }) // Convert data to json
.then(function(data) {
  console.log(data)
}) // End of thens
} // End of init function

// TODO: Fetch the definition


// TODO: Display english word and definiton to the page


// TODO: Translate word using translate api


// TODO: Display translated word


// TODO: Save english and translated word to local storage


// TODO: Get from local storage and display to the table in the html framework


// Call init function
initFunction();


// TODO: Keyboard events


// TODO: Event listeners