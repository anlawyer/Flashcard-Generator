var fs = require('fs');
var mysql = require('mysql');
var BasicCard = require('./BasicCard');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'basicCardDB'
});
 
connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	start();
});

var cardArray = [];

var start = function() {
	inquirer.prompt([
		{
			name: 'choice',
			type: 'list',
			message: 'Would you like to create, read all, or review your flashcards?',
			choices: ['create', 'read', 'review']
		}
	]).then(function(answers){
		if (answers.choice === 'create') {
			makeNewFlashcard();
		} else if (answers.choice === 'read') {
			readFlashcards();
		} else {
			console.log('Coming soon!')
			connection.end();
			//playFlashcards();
		}
	});
};

var startOrExit = function() {
	inquirer.prompt([
		{
			name: 'choice',
			type: 'list',
			message: 'Would you like to return to choices or exit?',
			choices: ['choices', 'exit']
		}
	]).then(function(answers) {
		if(answers.choice === 'choices'){
			start();
		} else {
			connection.end();
		}
	});
};

var makeNewFlashcard = function() {
	inquirer.prompt([
		{
			name: 'front',
			message: 'Type front of flashcard here:',
			type: 'input'
		},
		{
			name: 'back',
			message: 'Type back of flashcard here:',
			type: 'input'
		},
		{
			name: 'continue',
			message: 'Do you want to add another card?',
			type: 'confirm'
		}
	]).then(function (answers) {

		var newCard = new BasicCard(answers.front, answers.back);

		cardArray.push(newCard);
		
		var query = connection.query(
			'INSERT INTO cards SET ?',
			{
				front: answers.front,
				back: answers.back
			}, function(err, res) {
				if (err) {
					console.log(err)
				}
			}
		);

		if(answers.continue) {
			console.log('Card has been added.')
			makeNewFlashcard();
		} else { 
			console.log('Card has been added.')
			startOrExit();
		}
	});
};

var readFlashcards = function() {
	var query = connection.query(
		'SELECT * FROM cards',
		function(err, res) {

			console.log('The current flashcards in your deck:')

			for (var i = 0; i < res.length; i++) {	
				console.log(res[i].id + " | " + res[i].front + " | " + res[i].back);
			};

			startOrExit();
		}
	);
};

// Incomplete, but working on it
// (function currently only works with one card in the deck)

// var count = connection.query(
// 	'SELECT id FROM cards',

// 	)

// var playFlashcards = function() {
// 	// for each card in the deck, display *only* the front and wait for response
// 	// if correct, move to next card
// 	// if wrong, show answer, then move to next card
// 	// when done with all, ask if to exit or re-start

// 	var query = connection.query(
// 		'SELECT * FROM cards', 

// 		function(err, res) {
// 			for(var i = 0; i < res.length; i++) {
// 				var curFront = res[i].front;
// 				var curBack = res[i].back;

// 				inquirer.prompt([
// 					{
// 						name: 'question',
// 						message: curFront,
// 						type: 'input'
// 					}
// 				]).then(function(answers){
// 					if (answers.question === curBack) {
// 						console.log('You got it! Next question:')
// 						// run function again?
// 					} else {
// 						console.log('That\'s not right. The answer is ' + curBack)
// 						// next question. run it again?
// 					}
// 				})
// 			}
// 		}
// 	);
// };
