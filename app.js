// Prompt the user for their name
let name = prompt('What is your name?');

// Log the name to the console
console.log('Hello, ' + name + '!');

// Show a conditional prompt when the webpage loads
window.addEventListener('DOMContentLoaded', function () {
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
//new
initializeDeck();


// new
// Initialize the deck when the page loads
window.addEventListener('DOMContentLoaded', function () {
  initializeDeck();
  dealCards();
});



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
  //new
  userHand.sort((a, b) => getCardValue(b) - getCardValue(a)); // Sort user's hand
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
  //new
  doyleHand.sort((a, b) => getCardValue(b) - getCardValue(a)); // Sort Doyle's hand
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

// Define a mapping of ranks to numerical values

//TODO:
//This can also contain suit values
const rankValues = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
};
// Function to get the numerical value of a card
// function getCardValue(card) {
//   const rank = card.slice(0, -1);
//   return rankValues[rank];
// }

function compareHands(userHandName, doyleHandName) {
  const handValues = {
    'Royal Flush': 1000,
    'Straight Flush': 900,
    'Four-Of-A-Kind': 800,
    'Full House': 700,
    'Flush': 600,
    'Straight': 500,
    'Three-Of-A-Kind': 400,
    'Two Pair': 300,
    'One Pair': 200,
    'High Card': 100

  };
  // console.log('Hand Values', handValues);

  const userValue = handValues[userHandName];
  const doyleValue = handValues[doyleHandName];
  const userHand = deck.slice(0, 5);
  const doyleHand = deck.slice(5, 10);
  //TODO: Sort needs to produce this (below)
  // Player 1: k, k, 10, 10, 4
  //    Doyle: q, q, 9, 9, K
  //How do i sort a poker hand by rank and value?
  //array.sort????

  let userHandSorted = userHand.slice().sort((a, b) => {
    return getCardValue(b) - getCardValue(a);
  });
  let doyleHandSorted = doyleHand.slice().sort((a, b) => {
    return getCardValue(b) - getCardValue(a);
  });

  //TODO: After we properly sort, do a loop that iterates over each card, subtracting the player card at index from Doyle's card at index. Anytime there is a non-zero result, we are done. This loop only matters when the hands are NOT the same rank but it will break any ties.

  console.log('user', userValue, userHandSorted);
  console.log('doyle', doyleValue, doyleHandSorted);


  if (userValue > doyleValue) {
    console.log('Congratulations! You win!');
  } else if (userValue < doyleValue) {
    console.log('Doyle wins! Better luck next time!');
  }


  // if (userValue !== doyleValue) {

  //   if (userValue > doyleValue) {
  //     console.log('Congratulations! You win!');
  //   } else if (userValue < doyleValue) {
  //     console.log('Doyle wins! Better luck next time!');
  //   }
  // } else {
  //   // If both hands have the same value, compare individual card values
  //   const userHand = deck.slice(0, 5);

  //   const doyleHand = deck.slice(5, 10);



  //   let userMaxCard = Math.max(...userHand.map(card => getCardValue(card)));
  //   let doyleMaxCard = Math.max(...doyleHand.map(card => getCardValue(card)));

  //   // console.log('userMaxCard', userMaxCard);
  //   // console.log('doyleMaxCard', doyleMaxCard);

  //   if (userMaxCard > doyleMaxCard) {
  //     alert('Congratulations! You win!');
  //   } else if (userMaxCard < doyleMaxCard) {
  //     // console.log('Doyle Wins Situation');
  //     // console.log('userMaxCard', userMaxCard);
  //     // console.log('doyleMaxCard', doyleMaxCard);
  //     alert('Doyle wins! Better luck next time!');
  //   }
  //   else {
  //     // If both have the same high card, compare second highest, third highest, etc.
  //     let userHandSorted = userHand.slice().sort((a, b) => getCardValue(b) - getCardValue(a));
  //     let doyleHandSorted = doyleHand.slice().sort((a, b) => getCardValue(b) - getCardValue(a));

  //     let userRankIndex = 0;
  //     let doyleRankIndex = 0;
  //     while (userRankIndex < userHandSorted.length && doyleRankIndex < doyleHandSorted.length) {
  //       let userCardValue = getCardValue(userHandSorted[userRankIndex]);
  //       let doyleCardValue = getCardValue(doyleHandSorted[doyleRankIndex]);
  //       //Player: Ace, 10, 5, 4, 2, 
  //       //Doyle: Ace, 9, 8, 7, 6,
  //       if (userCardValue !== doyleCardValue) {
  //         if (userCardValue > doyleCardValue) {
  //           console.log('Congratulations! You win!');
  //         } else {
  //           console.log('Doyle wins! Better luck next time!');
  //         }
  //         return; // Comparison done, exit the function
  //       }

  //       // If cards are equal, move to next highest card
  //       userRankIndex++;
  //       doyleRankIndex++;
  //     }

  //     // alert("It's a tie! Both players have the same hand.");

  //   }
  // }
}

// Function to get the numerical value of a card
function getCardValue(card) {
  const rank = card.slice(0, -1);
  // console.log('Rank', rank);
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  // console.log('Ranks', ranks);
  // console.log('Ranks of Index', ranks.indexOf(rank) + 2);
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
    console.log('rank', rank);
    const suit = card.slice(-1);
    console.log('suit', suit);

    ranksCount[rank] = (ranksCount[rank] || 0) + 1;
    suitsCount[suit] = (suitsCount[suit] || 0) + 1;
  }
  console.log('ranksCount', ranksCount);
  console.log('suitsCount', suitsCount);


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

function getDoyleHandName(cards) {
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

// // Initialize the deck when the page loads
// window.addEventListener('DOMContentLoaded', function () {
//   initializeDeck();
//   dealCards();
// });
