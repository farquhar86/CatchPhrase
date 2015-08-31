// REQUIREMENTS //
var db = require('./models');
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
    _ = require("underscore"),
    views = path.join(process.cwd(), "views/");

// CONFIG //
// serve js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({ extended: true }));


// ROUTES //
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(views + 'index.html'));
});

// cards index path
app.get("/cards", function (req, res){    
    db.Card.find({}, function(err, cards_list){
      
        if (err) {
            console.log("BAD THING!");
            return res.sendStatus(400);
        }
      res.send(cards_list);
    })
});

app.post("/cards", function (req, res){
  var newCard = req.body;
  db.Card.create(newCard, function(err, card){ 
        if (err) {
            console.log("BAD THING!");   
        }
     res.send(card);
      })
        
    });

app.delete("/cards/:id", function destroy(req, res){
  var id = req.params.id;
  db.Card.remove({_id: id}, function(err, food){
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    res.sendStatus(200);
  });

});

app.listen(3000, function (){
  console.log("listening on port 3000");
});
