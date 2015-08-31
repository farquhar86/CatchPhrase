var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catchphrase");

module.exports.Card = require("./card");