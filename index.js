let form = document.querySelector("form"); //get the form element
let textContent = document.querySelector("textarea"); //get the users main text
let scrambleWords = document.querySelector("#redact"); //get the words to be scrambled
let redactSymbol = document.querySelector("#redactSymbol"); //get the symbols to use in scrambling
let outputParagraph = document.querySelector(".output"); //get the paragraph to show the output
let statisticsSection = document.querySelector(".stats"); //get the statistics section
let statsTable = document.querySelector("tbody"); //get the table to display the statistics
let timeTakenSpan = document.querySelector(".time"); //get the span to show the time taken
let scannedWordsSpan = document.querySelector(".scanned-words"); //get the span to show the number of scanned words
let matchedWordsSpan = document.querySelector(".matched-words"); //get the span to show the number of matched words
let scrambledCharactersSpan = document.querySelector(".scrambled-characters"); //get the span to show the number of scrambled characters

//object to store the stats of the scrambles words
let scrambleWordsCounter = {};

//whenever the form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault(); //prevent the default action
  let textContentValue = textContent.value; //get the value of the users main text
  let scrambleWordsValue = scrambleWords.value; //get the value of the words to be scrambled
  statisticsSection.style.display = "block"; //show the statistics section

  textContentValue = textContentValue.split(" "); //split the users main text into an array for easier operation
  scrambleWordsValue = scrambleWordsValue.split(" "); //split the words to be scrambled into an array

  setupScrambleWordsCounter(scrambleWordsValue); //setup the object for the scrambled words

  statsTable.innerHTML = ""; //reset the statistics table to clear any previous data
  let replaceMessage =
    redactSymbol.value.trim() === "" ? "*" : redactSymbol.value; //check that the redact symbol is not empty

  let redactedMessage = ""; //initialize the final output to empty string

  let startTime = new Date().getTime(); //get the time right before scanning

  //for each word in the users main text
  for (i of textContentValue) {
    let indexOfWord = scrambleWordsValue.indexOf(trim(i)); //trim each word for postfix punctuation and check if they are to be scrambled

    //if they are to be scrambled
    if (indexOfWord !== -1) {
      redactedMessage += `<span class="blue">${redactMessage(
        i,
        replaceMessage
      )} </span>`; //scramble them and add to the final output
      scrambleWordsCounter[trim(i)] += 1; //update the statistics object
    } else {
      redactedMessage += `${i} `; //otherwise, just add the word to the final output
    }
  }

  let endTime = new Date().getTime(); //get the time right after scanning

  outputParagraph.innerHTML = redactedMessage; //display the output

  //display the statistics object using a table
  for (let i in scrambleWordsCounter) {
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `<tr><td>${i}</td><td>${scrambleWordsCounter[i]}</td></tr>`;
    statsTable.appendChild(tableRow);
  }

  timeTakenSpan.textContent = `${endTime - startTime}ms`; //display the time taken
  scannedWordsSpan.textContent = `${textContentValue.length} words`; //display the number of scanned words

  matchedWordsSpan.textContent = `${(() => {
    let totalMatches = 0;
    for (let i in scrambleWordsCounter) {
      totalMatches += scrambleWordsCounter[i];
    }
    return totalMatches;
  })()} matches`; //display the number of matched words

  scrambledCharactersSpan.textContent = `${(() => {
    let totalScrambledCharacters = 0;
    for (let i in scrambleWordsCounter) {
      totalScrambledCharacters += i.length * scrambleWordsCounter[i];
    }
    return totalScrambledCharacters;
  })()} characters`; //display the number of scrambled characters
});

//function to remove postfix punctuations
function trim(word) {
  let specialCharacters = `,.!?:;"'`; //punctuations that will be used
  let cleared = false;

  while (!cleared) {
    if (specialCharacters.includes(word[word.length - 1])) {
      word = word.slice(0, word.length - 1);
    } else {
      cleared = true;
    }
  }
  return word;
}

//function to setup the statistics object
function setupScrambleWordsCounter(scrambleWordsArray) {
  for (let i of scrambleWordsArray) {
    scrambleWordsCounter[i] = 0;
  }
}

//function to redact the given word
function redactMessage(word, symbol) {
  if (symbol.length === 1) {
    return symbol.repeat(word.length);
  } else {
    return symbol;
  }
}

/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est quae hic fugit facilis minus quod totam quos, ratione odit labore quibusdam voluptate? Dolor fugit ipsa mollitia quos doloribus provident. Repellat. */
