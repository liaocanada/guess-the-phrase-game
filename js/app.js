/* Phrases 
*********************/
let currentPhrase;
let availableGuesses;
let lettersGuessed;

const phrases = [
	"Not A Problem",
	"A Bargain At Half The Price",
	"A Chip Off The Old Block",
	"Attracting Attention",
	"Double Talk",
	"A Day Late And A Dollar Short",
	"Birthplace Of Democracy",
	"Controlled Chaos",
	"Act Like An Adult",
	"Can I Have A Hug",
	"And They Lived Happily Ever After",
	"All That Jazz",
	"Age Is Just A Number",
	"All Good Things Come To Those Who Wait",
	"Bid Adieu",
	"Eat Drink And Be Merry",
	"Access Denied",
	"Dog Days Of Summer",
	"Expand Your Horizons",
	"Follow The Crowd",
	"Fog As Thick As Pea Soup",
	"Behind The Times",
	"Business Casual",
	"Having A Blast",
	"Hot And Spicy",
	"What A Good Boy",
	"Lay It On The Line",
	"Let The Sunshine In",
	"Mad As A Hatter",
	"Monkey See Monkey Do",
];


/* Helper Functions 
*********************/

function newGame() {
	// pick random phrase
	currentPhrase = randomPhrase();
	// reset counters
	availableGuesses = 5;
	numLettersGuessed = 0;
	// display phrase as blank spaces
	displayPhraseAsBlanks(currentPhrase);
	// clear alphabet of right,wrong indicators
	clearAlphabetRightWrong();
}

// select random phrase
function randomPhrase() {
	const rand = Math.floor(Math.random() * phrases.length);
	return phrases[rand];
}

// element factory 
function createElement(type, prop, value) {
	const element = document.createElement(type);
	element[prop] = value;
	return element;
}

// reduce available guesses by 1
function reduceAvailableGuesses() {
	availableGuesses -= 1;

	reduceGuessDisplay();
}

// handle end game 
function gameOver(playerWin) {
	// display overlay with popup 
	if (playerWin) {
		displayOverlayWithMessage("You got it! Want to play again?")
	} else {
		displayOverlayWithMessage(`Whoops! The phrase was '${currentPhrase}'. Better luck next time!`);
	}
}

// if all letters in phrase have been guessed, player wins


/* Display Functions
***********************/

function displayPhraseAsBlanks(phrase) {
	// select phrase div 
	const phraseDiv = document.querySelector('.phrase');
	phraseDiv.innerHTML = '';
	// start with empty word div 
	let wordDiv = createElement('div', 'className', 'word');
	let letterDiv;
	let spaceDiv;

	// loop over each letter in phrase
	for (let c = 0; c < phrase.length; c++) {
		if (phrase[c] === ' ') {
			// end of word, add word to phrase div 
			phraseDiv.append(wordDiv);

			// append space to phrase div 
			spaceDiv = createElement('div', 'className', 'space');
			spaceDiv.classList.add('letter');
			phraseDiv.append(spaceDiv);

			// create new word div 
			wordDiv = createElement('div', 'className', 'word');
		} else {
			// create letter
			letterDiv = createElement('div', 'className', 'letter');

			// add letter to word div
			wordDiv.append(letterDiv);
		}
	}

	phraseDiv.append(wordDiv);
}

// reduces guess indicator display according to available guesses left
function reduceGuessDisplay() {
	const guesses = document.querySelector('.guesses');

	// add spent class to next guess indicator
	guesses.children[4 - availableGuesses].classList.add('spent');
}

function displayExposedLetter(letter) {
	// select phrase display
	const phraseDiv = document.querySelector('.phrase');

	// loop over all letters in current phrase
	for (let c = 0; c < currentPhrase.length; c++) {
		if (currentPhrase[c].toLowerCase() === letter) {
			// track num letters guessed 
			numLettersGuessed++;

			// create p tag to hold letter
			const letterPara = createElement('p', 'textContent', letter.toUpperCase());

			// insert into appropriate phraseDiv letter
			phraseDiv.querySelectorAll('.letter')[c].append(letterPara);

		}
	}

}

function displayOverlay() {
	document.querySelector('.overlay').style.display = ""
}

function displayOverlayWithMessage(msg) {
	document.querySelector('.inner-overlay p').textContent = msg;
	displayOverlay();
}

function hideOverlay() {
	document.querySelector('.overlay').style.display = "none"
}

// remove classes 'right' and 'wrong' from all alphabet letters 
function clearAlphabetRightWrong() {
	const letters = document.querySelectorAll('.alphabet .letter');

	for (let i = 0; i < letters.length; i++) {
		if (letters[i].classList.contains('right')) {
			letters[i].classList.remove('right');
		} else if (letters[i].classList.contains('wrong')) {
			letters[i].classList.remove('wrong');
		}
	}
}

/* Event Listeners 
***********************/

document.querySelector('.alphabet').addEventListener('click', e => {
	// respond if user clicks letter not already clicked and marked right or wrong 
	if (e.target.tagName === 'P' && !(e.target.parentElement.classList.contains('wrong') || e.target.parentElement.classList.contains('right'))) {
		const letter = e.target.textContent.toLowerCase().trim();

		// check if phrase contains letter
		if (currentPhrase.toLowerCase().indexOf(letter) > -1) {
			// expose letter in word display 
			displayExposedLetter(letter);

			// mark letter div right
			e.target.parentElement.classList.add('right');

			// check if all letters have been guessed 
			if (numLettersGuessed === currentPhrase.replace(/ /g, '').length) {
				gameOver(true);
			}

		} else {
			// else mark letter div wrong 
			e.target.parentElement.classList.add('wrong');

			// reduce available guesses 
			reduceAvailableGuesses();

			// all out of guesses, game over 
			if (availableGuesses === 0) {
				gameOver(false);
			}
		}
	}
});

document.querySelector('.inner-overlay button').addEventListener('click', e => {
	// starting new game 
	newGame();
	// hide overlay 
	hideOverlay();
});
