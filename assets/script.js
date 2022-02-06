// WHEN, the page loads
// THEN, I am presented with all of the words I have learned so far
// GIVEN, I am presented with a page with a drop down to choose a language
// WHEN, I choose an option from the drop down box and press the Go button
// THEN, the application displays a word in english and similar words or a defintion
// WHEN, I have generated a new word,
// THEN, The words I have previously learned will display on the page

// TODO: Assign variables from the DOM
var chosenWord = document.getElementById("chosen-word");
var selectButton = document.getElementById("word-of-day");
var wordContainer = document.querySelector(".word-container");

// TODO: Assign other variables
var storedWords = [];

// Init Function
function initFunction() {
  // TODO: Fetch random word form random word API
  fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "56e1ec2b89msh75f5a1bd9fbcbb6p150a7bjsnb6e951a5a987",
    },
  })
    .then(function (response) {
      return response.json();
    }) // Convert data to json
    .then(function (data) {
      console.log(data);

      // Sets the word of the day to the DOM
      var randomWord = data.word;
      chosenWord.textContent = randomWord;

      // Sets word of the day to local storage
      storedWords.push(randomWord);
      testing(randomWord);
      localStorage.setItem("words", JSON.stringify(storedWords));
    }); // End of thens
  getWords();
} // End of init function

function testing(rword) {
  var word = "home";
  var key = "ca17d58e-66c7-41a6-a5c6-589cfe4e0342";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" +
      rword +
      "?key=" +
      key,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))

    // TODO: Function for if statement
    // If user choose defintion, display the defintion,
    // Else if, user chooses similar words, display similar words
    // Display in the "defintion" element in the DOM
    // Jacob

    .catch((error) => console.log("error", error)); // CHANGE FORM LOG TO DISPLAY ON PAGE AND OR LOG
} // End of second API fetch function

// Get from local storage and display to the table in the html framework
// TODO: FIX THIS!!! -Emma
function getWords() {
  var words = localStorage.getItem("words");
  words = JSON.parse(words);
  console.log(words);

  for (let i = 0; i < words.length; i++) {
    var word = words[i];
    var wordDiv = document.createElement("div");
    wordDiv.textContent = word;
    wordContainer.appendChild(wordDiv);
  }
}

// TODO: Event listener (event.target) for go button under the drop-down menu
// Jacob

// TODO: Event listeners
selectButton.addEventListener("click", initFunction);
