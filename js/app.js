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

// select random phrase
function randomPhrase() {
	const rand = Math.floor(Math.random() * phrases.length);
	return phrases[rand];
}

function createElement(type, prop, value) {
	const element = document.createElement(type);
	element[prop] = value;
	return element;
}

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

// display phrase as blank spaces
displayPhraseAsBlanks(randomPhrase());

// when letter in alphabet is clicked
	// phrase contains letter
		// display all occurances of letter in phrase
		// color letter in alphabet 
	// else 
		// take away a guess
		// color guess display 
		// color letter in alphabet 

// if all guesses are used up, game over (player looses)
// if all letters in phrase have been guessed, player wins