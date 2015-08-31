// On page load
$(function() {
  pageLoad();
  getCards() 
  newCard()
});

// function definitions

function pageLoad() {
  // load foods
  getCards();
  // set event listeners
  $("#new-card-form").on("submit",function(e){
    // prevent form submission
    e.preventDefault();
    console.log("I can hear you!!")
    // post to card#create
    $.post("/cards", $(this).serialize())
      .done(function(res){
        // append new food to the page
        getCards();
        $("#new-card-form")[0].reset();
      });
  });
}

function newCard() {
  $("#nextButton").click(function(e){    
    e.preventDefault();
    getCards()
  });
}














// }

function getCards() {
  $.get("/cards", function(res){
    var cards = res.reverse();
    // grab foods template
    renderCards(cards)
    renderCardsTwo(cards)
    // renderPhrases(cards)
    // console.log(cards)
  });
}

function renderCards(cards) {
  var template = _.template($("#cards-template").html());
  // input cards into template and append to parent
  
  // console.log(cards[2])
  //  var cardItems = function(card) {
  //   return template(card);

  // };
  var cardItems = cards.map(function(card) {
    return template(card);

  });
  // console.log(cardItems[1])
  // clear content (for repeated use)
  $("#card-ul").html("");
  // append foods to ul
  $("#card-ul ").append(cardItems);

}
function renderCardsTwo(cards) {
  var templateTwo = _.template($("#answer-template").html());
  // input foods into template and append to parent
  var cardItemsTwo = cards.map(function(card) {
    return templateTwo(card);
  });
  // clear content (for repeated use)
  $("#answer").html("");
  // append foods to ul
  $("#answer").append(cardItemsTwo);
  
}


// var words = [];
// var definitions = [];
// function renderPhrases(cards) {
//    //resets the arrays so they dont get overloaded every addition or removal of catchphrase
//    words = [];
//    definitions = [];
//    // console.log(cards.length)
//    words.push(cards)
//    console.log(words)
//    console.log(cards[1])
//    //makes the template out of our ul
//    var template = _.template($('#cards-template').html());
//    // var cpList = cards.map(function(e) {
//    //     words.push(e.word);
//    //     return template(e);
//    //     console.log(template(e))
//    // });
//   var num = Math.floor((Math.random() * (cards.length)) + 1);
//    //empties out the element so it isnt overloaded with catchphrases
//    // $('#card-ul').empty();
//    // //appends he cpList with map
//    // $('#card-ul').append(cpList);

//    //gets a random number between 0 and the last of the index of the array
//    // var randomNum = getRandomNum(0, (words.length - 1));
//    // console.log(randomNum)

//    //appends a word into #word element
//    // $('#card-ul').append(words[num]);
// }


// var words = [];
// var definitions = [];
// function renderPhrases(cps) {
//    //resets the arrays so they dont get overloaded every addition or removal of catchphrase
//    words = [];
//    definitions = [];

//    //makes the template out of our ul
//    var template = _.template($('#cp-template').html());
//    var cpList = cps.map(function(e) {
//        words.push(e.word);
//        return template(e);
//    });

//    //empties out the element so it isnt overloaded with catchphrases
//    $('#catchphrases').empty();
//    //appends he cpList with map
//    $('#catchphrases').append(cpList);

//    //gets a random number between 0 and the last of the index of the array
//    var randomNum = getRandomNum(0, (words.length - 1));

//    //appends a word into #word element
//    $('#word').append(words[randomNum]);
// }













function deleteCard(context) {
  var cardId = $(context).data()._id;
  $.ajax({
    url: '/cards/' + cardId,
    type: 'DELETE',
    success: function(res) {
      
      getCards();
    }
  });
}
