var fs = require('fs');
var BasicCard = require('./BasicCard');
var inquirer = require('inquirer');

cardCount = 0;
cardArray = [];

var getNewFlashcard = function() {
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
			
			cardArray.push('Card' + cardCount + newCard);

			var arrayToLog = cardArray + '\n'
			
			fs.appendFile('baiscLog.txt', arrayToLog, function(err) {
				if(err) {
					console.log(err)
				};
			});
			
			cardCount++;

			console.log(newCard);
			console.log(cardArray);
			console.log(cardCount);

			if(answers.continue) {
				getNewFlashcard();
			} else { 
				console.log('Thanks for adding your cards!')
			}
	});
}

getNewFlashcard();