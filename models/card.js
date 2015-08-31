var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var CardSchema = new Schema({
    name: String,
    description: String
    
});

var Card = mongoose.model('Card', CardSchema);
module.exports = Card;