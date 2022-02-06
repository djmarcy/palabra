// WHEN, the page loads
// THEN, I am presented with all of the words I have learned so far
// GIVEN, I am presented with a page with a drop down to choose a language
// WHEN, I choose an option from the drop down box and press the Go button
// THEN, the application displays a word in english and similar words or a defintion
// WHEN, I have generated a new word,
// THEN, The words I have previously learned will display on the page

// TODO: Assign variables from the DOM
var chosenWord = document.getElementById("chosen-word");
var wordOfTheDayBtn = document.getElementById("word-of-day");
var selectButton = document.getElementById("select-button");
var wordContainer = document.querySelector(".word-container");
var headingForResult = document.getElementById("definition");
var displayContainer = document.getElementById("displayContainer");

// TODO: Assign other variables
var storedWords = [];

// Get Word of Day Function
function getWordofDay() {
  // clear previous data
  chosenWord.textContent = "";
  headingForResult.textContent = "";
  displayContainer.textContent = "";
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
      // Sets the word of the day to the DOM
      var randomWord = data.word;
      chosenWord.textContent = randomWord;
      chosenWord.setAttribute("data-word", randomWord);

      // Sets word of the day to local storage
      storedWords.push(randomWord);
      localStorage.setItem("words", JSON.stringify(storedWords));
    }); // End of thens
  getWords();
} // End of Get Word of Day function

// function to call the appropriate function based on user choice
function decision() {
  var passedInWord = document
    .getElementById("chosen-word")
    .getAttribute("data-word");
  var ddl = document.getElementById("lang-select");
  var selected = ddl.value;
  if (selected == "similar-words") {
    similar(passedInWord);
  } else if (selected == "defintion") {
    defintion(passedInWord);
  }
} //end of decision function

// THIS FUNCTION PINGS THE THESAURUS
function similar(rword) {
  var word = rword;
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
    .then(function (data) {
      var similarOne = data[0];
      headingForResult.textContent = "Similar word:";
      displayResult(similarOne);
    })
    .catch((error) => console.log("error", error)); // CHANGE FORM LOG TO DISPLAY ON PAGE AND OR LOG
} //End of Thesarus Function

// THIS FUNCTION PINGS THE DICTIONARY
function defintion(rword) {
  var word = rword;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" +
      word +
      "?key=579eae0a-3a35-44ce-b657-5006082e2ec0",
    requestOptions
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      if (data.length < 3) {
        var shortdef = data[0].shortdef[0];
        if (shortdef === null) {
          shortdef = data[1].shoftdef[0];
        } else {
          headingForResult.textContent = "Definition:";
          displayContainer.textContent = shortdef;
        }
      } else {
        var oneWorder = data[0];
        headingForResult.textContent = "Definition:";
        displayContainer.textContent = oneWorder;
      }
    });
  // .catch(error => console.log('error', error));
} //end of Dictionary Function

// Get from local storage and display to the table in the html framework
// // TODO: FIX THIS!!! -Emma
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

selectButton.addEventListener("click", decision);
wordOfTheDayBtn.addEventListener("click", getWordofDay);
