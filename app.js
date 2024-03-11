
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
  let userCards = document.querySelector('.userCards');
  userCards.innerHTML = '';
  document.getElementById('handName').textContent = '';

  //doyle's cards
  let doyleCardsElement = document.querySelector('.doyleCards');
  doyleCardsElement.innerHTML = '';



  // Shuffle the deck
  shuffle(deck);

  // Display the first 5 cards
  for (let i = 0; i < 5; i++) {
    let cardElement = document.createElement('div');
    cardElement.textContent = deck[i];
    cardElement.classList.add('card');
    userCards.appendChild(cardElement);
  }

  // Calculate and display the hand name
  const handName = getHandName(deck.slice(0, 5));
  document.getElementById('handName').textContent = `Hand: ${handName}`;

  // Display the next 5 cards for Doyle
  for (let i = 5; i < 10; i++) {
    let doyleCardElement = document.createElement('div');
    doyleCardElement.textContent = deck[i];
    doyleCardElement.classList.add('card');
    doyleCardsElement.appendChild(doyleCardElement);
  }


  // Log the dealt cards to console
  console.log('User cards:', deck.slice(0, 5));
  //doyle's command
  console.log('Doyle cards:', deck.slice(5, 10));
}

//hand names 
// Determine the poker hand name
function getHandName(cards) {
  const ranksCount = {};
  const suitsCount = {};

  // Count the occurrences of each rank and suit
  for (const card of cards) {
    const rank = card.slice(0, -1);
    const suit = card.slice(-1);

    ranksCount[rank] = (ranksCount[rank] || 0) + 1;
    suitsCount[suit] = (suitsCount[suit] || 0) + 1;
  }

  const uniqueRanks = Object.keys(ranksCount);
  const numUniqueRanks = uniqueRanks.length;

  // Check for flush
  const isFlush = Object.values(suitsCount).some(count => count === 5);

  // Check for straight
  const sortedRanks = uniqueRanks.sort((a, b) => ranks.indexOf(a) - ranks.indexOf(b));
  const isStraight = sortedRanks.length === 5 && ranks.indexOf(sortedRanks[4]) - ranks.indexOf(sortedRanks[0]) === 4;

  // Check for specific hand combinations
  if (isFlush && isStraight) {
    // Royal Flush check
    if (sortedRanks[0] === '10' && sortedRanks[4] === 'A') {
      return 'Royal Flush';
    }
    return 'Straight Flush';
  } else if (Object.values(ranksCount).includes(4)) {
    return 'Four-Of-A-Kind';
  } else if (Object.values(ranksCount).includes(3) && Object.values(ranksCount).includes(2)) {
    return 'Full House';
  } else if (isFlush) {
    return 'Flush';
  } else if (isStraight) {
    return 'Straight';
  } else if (Object.values(ranksCount).includes(3)) {
    return 'Three-Of-A-Kind';
  } else if (numUniqueRanks === 2) {
    return 'Two Pair';
  } else if (numUniqueRanks === 3) {
    return 'One Pair';
  } else {
    return 'High Card';
  }
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
  dealCards();
  getHandName();
});

