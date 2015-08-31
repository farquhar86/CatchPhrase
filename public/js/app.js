// On page load
$(function() {
  pageLoad();
  // getCards(); 
  newCard();
  getAllCards();
});

// function definitions

function pageLoad() {
  // load cards
  getEveryCard();
  // set event listeners
  $("#new-card-form").on("submit",function(e){
    // prevent form submission
    e.preventDefault();
    // post to card#create
    $.post("/cards", $(this).serialize())
      .done(function(res){
        // append new card to the page
        getEveryCard();
        $("#new-card-form")[0].reset();
      });
  });
}

function newCard() {
  $("#nextButton").click(function(e){    
    e.preventDefault();
    $('#card-ul').empty();
    $('#answer').empty();
    getCards()
  });
}

// this function waits for the button view all cards to be click
function getAllCards() {
  $("#allWordsButton").click(function(e){    
    e.preventDefault();
    getEveryCard()
    console.log("i hear you!!!")
  });
}
// this function grabs all the cards from the db
function getEveryCard() {
  $.get("/cards", function(res){
    var cards = res.reverse();
    renderAllCards(cards)
    renderAllCardsTwo(cards)
  });
}

// this puts all the cards on the site
function renderAllCards(cards) {
  var template = _.template($("#cards-template").html());
  var cardItems = cards.map(function(cards) {
    return template(cards);
  });
  $("#card-ul").html("");
  $("#card-ul ").append(cardItems);

}
// this puts all the answers on the site
function renderAllCardsTwo(cards) {
  var templateTwo = _.template($("#answer-template").html());
  var cardItemsTwo = cards.map(function(cards) {
    return templateTwo(cards);
  });
  $("#answer").html("");
  $("#answer").append(cardItemsTwo);
  
}

function getCards() {
  $.get("/cards", function(res){
    var cards = res.reverse();
    // grab random number
    var num = Math.floor((Math.random() * (cards.length)));
    var card = cards[num]
    renderCards(card)
    renderCardsTwo(card)
    
  });
}

function renderCards(card) {
  var template = _.template($("#cards-template").html());
  var cardItem = template(card);
  $("#card-ul").html("");
  $("#card-ul ").append(cardItem);

}
function renderCardsTwo(card) {
  var templateTwo = _.template($("#answer-template").html());
  var cardItemTwo = templateTwo(card);
  $("#answer").html("");
  $("#answer").append(cardItemTwo);
  
}



function deleteCard(context) {
  var cardId = $(context).data()._id;
  $.ajax({
    url: '/cards/' + cardId,
    type: 'DELETE',
    success: function(res) {
      
      getEveryCard();
    }
  });
}
