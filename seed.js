var db = require('./models');


var cards_list = [

	{name: "code", description: "Rhymes with node"},
	{name: "DOM", description: "Scary!!"},
	{name: "KISS", description: "Tyes Please!!"}
	

]


db.Card.remove({}, function(err, cards){
	if (err) return console.log(err);

	db.Card.create(cards_list, function (err, subcard) {
	    if (err) { return console.log(err); };
	    console.log(subcard);

	});
});