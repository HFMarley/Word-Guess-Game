//create an array of words to be guessed
var wordList = ["peru", "mexico", "nicaragua", "argentina", "guatemala", "uruguay", "honduras", "brazil", "columbia", "bolivia"];


var chosenWord = "";
var lettersInChosenWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];

var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

//function for starting and restarting the game.
function startGame() {
    //reset at each round
    numGuesses = 9;

    //to access a random word we need to use the generated random integer as the index in the array hence:
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
    //this is the same as the following lines of code
    // var randomInt = Math.floor(Math.random() * wordsList.length;
    // chosenWord = wordList[randomInt];

    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;

    console.log(chosenWord);

    //reset after each round
    blanksAndSuccesses = [];
    wrongGuesses = [];

    //fill the blanksAndSuccesses array with the appropriate number of blanks/underscores. based on number of integers in chosen word.
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    console.log(blanksAndSuccesses);

    //resets the html after each round
    document.getElementById("guesses-left").innerHTML = numGuesses;

    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
};

//function for comparing integers/letters with user selection
function checkLetters(letter) {

    var letterInWord = false;

    //check if letter exists inside the array
    for (var i = 0; i < numBlanks; i++) {
        if(chosenWord[i] === letter) {
            letterInWord = true;
        }
    }

    // If the letter exists somewhere in the word, then figure out exactly where (which indices).
    if (letterInWord) {

        //loop through the word
        for (var j = 0; j < numBlanks; j++) {

            //populate the blanksAndSuccesses with every instance of the letter.
            if (chosenWord[j] === letter) {
                blanksAndSuccesses[j] = letter;
            }
        }
        console.log(blanksAndSuccesses);
    }

    else {
        wrongGuesses.push(letter);
        numGuesses--;
    }
}

//Here we will have all of the code that needs to be run after each guess is made
function roundComplete() {

    //Status update for testing purposes
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

    // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
    document.getElementById("guesses-left").innerHTML = numGuesses;

    //this will print the array of guesses and blanks onto the page.
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

    //this will print the wrong guesses onto the page.
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

    if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
        winCounter++;
        alert("you win");

        document.getElementById("win-counter").innerHTML = winCounter;
        startGame();
    }

    else if (numGuesses === 0) {
        lossCounter++;
        alert("you lose");

        document.getElementById("loss-counter").innerHTML = lossCounter;
        startGame();
    }
}



//This is the code that controls what is actually run

startGame();

document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.which).toLowerCase();

    checkLetters(letterGuessed);

    roundComplete();
};
