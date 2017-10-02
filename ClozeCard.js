var fs = require('fs');

var ClozeCard = function(text, cloze){

	// scope-safe construction. if someone called the construtor without the 'new' 
	// keyword, then this function will catch it and make sure the object is created with 'new'
	if (!(this instanceof ClozeCard)) { 
    
    	return new ClozeCard(text, cloze);
  	};
  	// if called with 'new', run the following on the inputs
	this.cloze = cloze;
	this.fullText = text;

	// setting variables to manipulate
	var full = this.fullText;
	var toFind = this.cloze;
	var elipses = '...';
	var index = full.indexOf(toFind);

	// creating function to remove the cloze deletion text 
	function replaceStr(oldStr, newStr, fullStr) {
		return fullStr.split(oldStr).join(newStr);
	};

	// if the cloze text is in the full text, run the replacement function
	// else log an error
	if (index !== -1) {
	    var partial = replaceStr(toFind, elipses, full);
	} else {
		console.log('\nError! ' + '"' + toFind + '"' +' isn\'t in the full text.')
		return;
	};

	this.partial = partial;
	
	// console.log('\ninital full text:', this.fullText);
	// console.log('partial:',this.partial);
	// console.log('cloze:', this.cloze);
}

ClozeCard.prototype.toLog = function() {
	var clozeLog = '\nFull Text: ' + this.fullText + ' Partial: ' +
		this.partial + ' Cloze Deletion: ' + this.cloze;
	
	console.log(logTxt);

	fs.appendFile('cardLog.txt', logTxt, function(err) {
		if(err) {
			console.log(err)
		};
	});
};

module.exports = ClozeCard;

var card1 = new ClozeCard('The sky is blue.', 'blue');
// var card2 = new ClozeCard('Frank is the best.', 'Frank');
// var card3 = new ClozeCard('I like cats and dogs.', 'cats');
//var card4 = new ClozeCard('I like cats and dogs.', 'cats and birds');
// var card5 = new ClozeCard('The sun is 93 million miles away from the earth.', '93 million');
// var card6 = ClozeCard('berkeley is a city.', 'berkeley')

console.log(card1.fullText);
console.log(card1.partial);
console.log(card1.cloze);


