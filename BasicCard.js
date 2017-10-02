
var fs = require('fs');

var BasicCard = function(front, back) {

	if (!(this instanceof BasicCard)) { 
    
    	return new BasicCard(front, back);
  	};

	this.front = front;
	this.back = back;
};

// BasicCard.prototype.toLog = function() {
// 	var logTxt = '\nFront: ' + this.front + ' Back: ' + this.back;
	
// 	console.log(logTxt);

// 	fs.appendFile('baiscLog.txt', logTxt, function(err) {
// 		if(err) {
// 			console.log(err)
// 		};
// 	});
// };

module.exports = BasicCard;

// var card1 = new BasicCard('What color is the sky?', 'blue');
// var card2 = BasicCard('How far is the sun from the earth?', '93 million miles')

// console.log(card1)
// console.log(card2)

// card1.toLog();
// card2.toLog();