var hangmanGame = {
	wordsToPick: {
		"javascript" : {
			picture: 'javascript.png'
		}, 
		"react" : {
			picture: 'react.png'
		}, 
		"angular" : {
			picture: 'angular.jpg'
		}, 
		"html" : {
			picture: 'html.png'
		}, 
		"css" : {
			picture: 'css.png'
		}, 
		"php" : {
			picture: 'php.png'

		}, 
		"mysql" : {
			picture: 'sql.png'
		}, 
		"mongodb" : {
			picture: 'mongo.png'
		},
		"node" : {
			picture: 'node.png'
		}, 
		"sass" : {
			picture: 'sass.png'
		},
		"jquery" : {
			picture: 'jquery.png'
		}
	},
	wordInPlay: null,
	lettersOfTheWord: [],
	matchedLetters: [],
	guessedLetters: [],
	guessesLeft: 0,
	totalGuesses: 0,
	letterGuessed: null,
	wins: 0,
	setupGame: function() {
		// ---Pick a random word
		var objKeys = Object.keys(this.wordsToPick);
		this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

		this.lettersOfTheWord = this.wordInPlay.split('');
		this.rebuildWordView();
		this.processUpdateTotalGuesses();
	},
	updatePage: function(letter) {
		if (this.guessesLeft == 0){
			this.restartGame();
		}else{
			this.updateGuesses(letter);

			this.updateMatchedLetters(letter);

			this.rebuildWordView();

			if (this.updateWins() == true){
				this.restartGame();
			}
		}

	},
	updateGuesses: function(letter){
		//if the letter is not in the guessedLetters array
		//and
		//the letter is not in the lettersOfTheWord array
		//then
		//make guesses go down

		if ((this.guessedLetters.indexOf(letter) == -1) && (this.lettersOfTheWord.indexOf(letter) == -1)){
			
			this.guessedLetters.push(letter);

			this.guessesLeft--;

			document.querySelector('#guesses-remaining').innerHTML = this.guessesLeft;

			document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(', ');
		}
	},
	processUpdateTotalGuesses: function() {
		this.totalGuesses = this.lettersOfTheWord.length + 5;
		this.guessesLeft = this.totalGuesses;

		// ---Render the guesses left
		document.querySelector('#guesses-remaining').innerHTML = this.guessesLeft;
	},
	updateMatchedLetters: function(letter){
		for (var i = 0; i < this.lettersOfTheWord.length; i++) {
			if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) == -1)){
				this.matchedLetters.push(letter);
			};
		};
	},
	rebuildWordView: function() {
		var wordView = "";

		for(var i=0; i < this.lettersOfTheWord.length; i++){
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) != -1){
				wordView += this.lettersOfTheWord[i];				
			}else{
				wordView += '&nbsp;_&nbsp;';
			}
		}

		document.querySelector('#current-word').innerHTML = wordView;

	},
	restartGame : function(){
		document.querySelector('#guessed-letters').innerHTML = '';
		this.wordInPlay = null;
		this.lettersOfTheWord = [];
		this.matchedLetters = [];
		this.guessedLetters = [];
		this.guessesLeft = 0;
		this.totalGuesses = 0;
		this.letterGuessed = null;
		this.setupGame();
		this.rebuildWordView();
	},
	updateWins: function() {

		//this won't work for words with double or triple letters
			//var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
			//this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')

		if (this.matchedLetters.length == 0){
			var win = false;
		}else{
			var win = true
		}
		
		for (var i=0; i < this.lettersOfTheWord.length; i++){
			if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) == -1){
				win = false;
			}
		}

		if (win == true){
			this.wins =  this.wins + 1;
			
			document.querySelector('#wins').innerHTML = this.wins;

			document.querySelector('#music').innerHTML = this.wordsToPick[this.wordInPlay].song + " By " + this.wordInPlay;

			document.querySelector('#bandDiv').innerHTML = '<img class="bandImage" src="images/' + this.wordsToPick[this.wordInPlay].picture + '" alt="' + this.wordsToPick[this.wordInPlay].song + '">';

			var audio = new Audio(this.wordsToPick[this.wordInPlay]);
			audio.play();


			return true;
		}else{
			return false;
		}
	}
};

hangmanGame.setupGame();

document.onkeyup = function(event) {
	hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	hangmanGame.updatePage(hangmanGame.letterGuessed);
}