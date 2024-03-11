
// Prompt the user for their name
let name = prompt('What is your name?');

// Log the name to the console
console.log('Hello, ' + name + '!');

// Show a conditional prompt when the webpage loads
window.addEventListener('DOMContentLoaded', function() {
  // Ask the user if they've ever played poker
  let response = confirm('Have you ever played poker, ' + name + '?');

  // Check the user's response
  if (response) {
    alert('Great! Enjoy the game, ' + name + '!');
  } else {
    alert('No worries, ' + name + '! Poker is fun to learn.');
  }
});


// Define a global array to represent the deck of cards
let deck = [];

// Fill the deck with standard playing cards (without jokers)
function initializeDeck() {
  let suits = ['♠', '♣', '♥', '♦'];
  let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      deck.push(ranks[j] + suits[i]);
    }
  }
}

// Deal 5 random cards from the deck
function dealCards() {
  // Clear previous cards
  let cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';

  // Shuffle the deck
  shuffle(deck);

  // Display the first 5 cards
  for (let i = 0; i < 5; i++) {
    let cardElement = document.createElement('div');
    cardElement.textContent = deck[i];
    cardElement.classList.add('card');
    cardContainer.appendChild(cardElement);
  }

  // Log the dealt cards to console
  console.log('Dealt cards:', deck.slice(0, 5));
}

// Define the function to handle the "fold" action
function handleFold() {
  let response = confirm('Do you have the best hand?');
  console.log('response', response);
  if (response) {
    alert('BET!');
  } else {
    alert('FOLD!');
  }
}

// Define the function to handle the "call" action
function handleCall() {
  let response = confirm('Do you think your hand is good enough to stick around to see what happens?');
  console.log('response', response);
  if (response) {
    alert('CALL!');
  } else {
    alert('FOLD!');
  }
}

// Define the function to handle the "raise" action
function handleRaise() {
  let response = confirm('Are you nearly certain that you have the best hand?');
  console.log('response', response);
  if (response) {
    alert('RAISE!');
  } else {
    alert('Slow down and see what the other guy does first.');
  }
}

// Define the function to handle the "all-in" action
function handleAllIn() {
  let response = confirm('Are you 100% positive that you have the best hand?');
  console.log('response', response);
  if (response) {
    alert('ALL IN!');
  } else {
    alert('Be very careful.');
  }
}

// Shuffle function
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Initialize the deck when the page loads
window.addEventListener('DOMContentLoaded', function() {
  initializeDeck();
});
