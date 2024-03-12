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
  document.getElementById('doyleHandName').textContent = '';



  // Shuffle the deck
  shuffle(deck);

  // Display the first 5 cards for the user
  let userHand = deck.slice(0, 5);
  for (let i = 0; i < 5; i++) {
    let cardElement = document.createElement('div');
    cardElement.textContent = userHand[i];
    cardElement.classList.add('card');
    userCards.appendChild(cardElement);
  }

  // Determine and display the user's poker hand
  const userHandName = getHandName(userHand);
  document.getElementById('handName').textContent = `Hand: ${userHandName}`;  

  // Display the next 5 cards for Doyle
  let doyleHand = deck.slice(5, 10);
  for (let i = 5; i < 10; i++) {
    let doyleCardElement = document.createElement('div');
    doyleCardElement.textContent = doyleHand[i - 5];
    doyleCardElement.classList.add('card');
    doyleCardsElement.appendChild(doyleCardElement);
  }

  // Determine and display Doyle's poker hand here
  const doyleHandName = getDoyleHandName(doyleHand);
  document.getElementById('doyleHandName').textContent = `Doyle's Hand: ${doyleHandName}`;

  // Compare the hands and display the result
  compareHands(userHandName, doyleHandName);

  // Log the dealt cards to console
  console.log('User cards:', userHand);
  console.log('Hand name:', userHandName);
  console.log('Doyle cards:', doyleHand);
  console.log('Doyle Hand', doyleHandName);
}

function compareHands(userHandName, doyleHandName) {
  const handValues = {
    'Royal Flush': 9,
    'Straight Flush': 8,
    'Four-Of-A-Kind': 7,
    'Full House': 6,
    'Flush': 5,
    'Straight': 4,
    'Three-Of-A-Kind': 3,
    'Two Pair': 2,
    'One Pair': 1,
    'High Card': 0
  };

  const userValue = handValues[userHandName];
  const doyleValue = handValues[doyleHandName];

  if (userValue !== doyleValue) {
    if (userValue > doyleValue) {
      alert('Congratulations! You win!');
    } else {
      alert('Doyle wins! Better luck next time!');
    }
  } else {
    // If both hands have the same value, compare individual card values
    const userHand = deck.slice(0, 5);
    const doyleHand = deck.slice(5, 10);


    let userMaxCard = Math.max(...userHand.map(card => getCardValue(card)));
    let doyleMaxCard = Math.max(...doyleHand.map(card => getCardValue(card)));

    if (userMaxCard > doyleMaxCard) {
      alert('Congratulations! You win!');
    } else if (userMaxCard < doyleMaxCard) {
      alert('Doyle wins! Better luck next time!');
    } else {
      alert('It\'s a tie! Both players have the same high card.');
    }
  }
}

// Function to get the numerical value of a card
function getCardValue(card) {
  const rank = card.slice(0, -1);
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  return ranks.indexOf(rank) + 2;
}

// Function to get the highest pair or high card from the hand
function getPairOrHighCard(cards) {
  const ranksCount = {};
  for (const card of cards) {
    const rank = card.slice(0, -1);
    ranksCount[rank] = (ranksCount[rank] || 0) + 1;
  }
  const pairs = Object.keys(ranksCount).filter(rank => ranksCount[rank] === 2);
  if (pairs.length > 0) {
    return pairs;
  } else {
    // If no pairs, return the hand sorted by rank
    return cards.sort((a, b) => getCardValue(b) - getCardValue(a));
  }
}

// Determine the poker hand name
function getHandName(cards) {
  const ranksCount = {};
  const suitsCount = {};
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

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
  } else if (Object.values(ranksCount).filter(count => count === 2).length === 2) {
    return 'Two Pair';
  } else if (Object.values(ranksCount).filter(count => count === 2).length === 1) {
    return 'One Pair';
  } else {
    return 'High Card';
  }
}

function getDoyleHandName(cards){
  const ranksCount = {};
  const suitsCount = {};
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

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
  } else if (Object.values(ranksCount).filter(count => count === 2).length === 2) {
    return 'Two Pair';
  } else if (Object.values(ranksCount).filter(count => count === 2).length === 1) {
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
});