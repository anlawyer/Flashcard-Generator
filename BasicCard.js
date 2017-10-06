
var fs = require('fs');

var BasicCard = function(front, back) {

	if (!(this instanceof BasicCard)) { 
    
    	return new BasicCard(front, back);
  	};

	this.front = front;
	this.back = back;
};

module.exports = BasicCard;

// example cards:
// var card1 = new BasicCard('What color is the sky?', 'blue');
// var card2 = BasicCard('How far is the sun from the earth?', '93 million miles')
