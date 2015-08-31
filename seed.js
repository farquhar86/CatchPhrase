var db = require('./models');


var cards_list = [

	{name: "These are", description: "This is a test answer"},
	{name: "Test", description: "Be as detailed as you like"},
	{name: "Cards", description: "Hope you learn lots"}
	

]


db.Card.remove({}, function(err, cards){
	if (err) return console.log(err);

	db.Card.create(cards_list, function (err, subcard) {
	    if (err) { return console.log(err); };
	    console.log(subcard);

	});
});