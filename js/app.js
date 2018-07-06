/* Phrases 
*********************/
let currentPhrase;
let availableGuesses; 
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
	"It is In A Class By It Self",
	"Lay It On The Line",
	"Let The Sunshine In",
	"Mad As A Hatter",
	"Monkey See Monkey Do",
];


/* Helper Functions 
*********************/

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


/* Display Functions
***********************/

function displayPhraseAsBlanks(phrase) {
	console.log(phrase);
	// select phrase div 
	const phraseDiv = document.querySelector('.phrase');
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

function reduceAvailableGuesses() {
	availableGuesses -= 1;

	reduceGuessDisplay();

	if (availableGuesses === 0) {
		// all out of guesses, game over 
		console.log('game over');
	}
}

// reduces guess indicator display according to available guesses left
function reduceGuessDisplay() {
	const guesses = document.querySelector('.guesses');

	// add spent class to next guess indicator
	guesses.children[4 - availableGuesses].classList.add('spent');
}

/* Event Listeners 
***********************/

document.querySelector('.alphabet').addEventListener('click', e => {
	// respond if user clicks letter not already clicked and marked right or wrong 
	if (e.target.tagName === 'P' && !(e.target.parentElement.classList.contains('wrong') || e.target.parentElement.classList.contains('right')) ) {
		const letter = e.target.textContent.toLowerCase().trim();
		
		// check if phrase contains letter
		if (currentPhrase.toLowerCase().indexOf(letter) > -1) {
			// expose letter in word display 

			// mark letter div right
			e.target.parentElement.classList.add('right');
		} else {
			// else mark letter div wrong 
			e.target.parentElement.classList.add('wrong');

			// reduce available guesses 
			reduceAvailableGuesses();
		}
		

	}
});

// display phrase as blank spaces
currentPhrase = randomPhrase();
availableGuesses = 5;
displayPhraseAsBlanks(currentPhrase);

// if all guesses are used up, game over (player looses)
// if all letters in phrase have been guessed, player wins