// TODO: Assign variables from the DOM
var chosenWord = document.getElementById("chosen-word");
var wordOfTheDayBtn = document.getElementById("word-of-day");
var selectButton = document.getElementById("select-button");
var wordContainer = document.querySelector(".word-container");
var headingForResult = document.getElementById("definition");
var displayContainer = document.getElementById("displayContainer");
var similarContainer = document.getElementById("similar-container")

// Date at the top of the page
document.getElementById("date").textContent = moment().format('MMMM Do YYYY')

// TODO: Assign other variables
var storedWords = [];

// Get Word of Day Function
function getWordofDay() {
  // clear previous data
  chosenWord.textContent = "";
  headingForResult.textContent = "";
  displayContainer.textContent = "";
  // TODO: Fetch random word form random word API
  fetch("https://random-word-api.herokuapp.com/word?number=10&swear=0", {
    method: "GET",

  })
    .then(function (response) {
      return response.json();
    }) // Convert data to json
    .then(function (data) {
      // Sets the word of the day to the DOM
      var randomWord = data[0];
      chosenWord.textContent = ('" ' + randomWord + ' "');
      chosenWord.setAttribute("data-word", randomWord);

      // Sets word of the day to local storage
      storedWords.push(randomWord);
      localStorage.setItem("words", JSON.stringify(storedWords));
    }); // End of thens
  getWords();
} // End of Get Word of Day function

// function to call the appropriate function based on user choice
function decision() {
  var passedInWord = document.getElementById("chosen-word").getAttribute("data-word");
  var ddl = document.getElementById("lang-select");
  var selected = ddl.value;
  // if statement to evaluate data attribute
  if (selected == "similar-words") {
    similar(passedInWord);
  } else if (selected == "defintion") {
    defintion(passedInWord);
  }
} //end of decision function

// THIS FUNCTION PINGS THE THESAURUS
function similar(rword) {
  // clear previous data
  displayContainer.textContent = "";
  var key = "ca17d58e-66c7-41a6-a5c6-589cfe4e0342";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  }
  fetch(
    "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" +
      rword +
      "?key=" +
      key,
    requestOptions
    )
    .then((response) => response.json())
    .then(function (data) {
      if (data.length <= 9) {
        var similarOne = data[0].meta.syns[0];
        if (similarOne === null) {
          similarOne = data[1].meta.syns;
        } else {
          headingForResult.textContent = "Similar Words";
          displayContainer.textContent = similarOne;
        }
      } else {
        var oneWorder = data[0];
        var wordTwo = data[1];
        headingForResult.textContent = "Similar Words";
        displayContainer.textContent = (`${oneWorder},  ${wordTwo}`);
      }
    })
    .catch((error) => console.log("error", error));
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
      if (data.length < 9) {
        var shortdef = data[0].shortdef[0];
        if (shortdef === null) {
          shortdef = data[0].shoftdef[1];
        } else {
          headingForResult.textContent = "What It Means";
          displayContainer.textContent = shortdef;
        }
      } else {
        var oneWorder = data[0];
        headingForResult.textContent = "What It Means";
        displayContainer.textContent = oneWorder;
      }
    })
  .catch(error => console.log('error', error));
} //end of Dictionary Function

// Get from local storage and display to the table in the html framework
function getWords() {
  var words = localStorage.getItem("words");
  words = JSON.parse(words);

  var wordDiv = document.createElement("div");
  wordDiv.textContent = words;
  wordContainer.appendChild(wordDiv);

}

getWordofDay ();

selectButton.addEventListener("click", decision);