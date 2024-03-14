// Prompt the user for their name
let name = prompt('What is your name?');

// Log the name to the console
console.log('Hello, ' + name + '!');

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
// initializeDeck();

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
  let userHand = deck.slice(0, 5).sort((a, b) => getCardValue(b) - getCardValue(a));
  const [userHandName, sortedPlayerHand, playerRanks] = getHandName(userHand);
  for (let i = 0; i < sortedPlayerHand.length; i++) {
    let cardElement = document.createElement('div');
    cardElement.textContent = sortedPlayerHand[i];
    cardElement.classList.add('card');
    userCards.appendChild(cardElement);
  }

  // Determine and display the user's poker hand
  // const userHandName = getHandName(userHand);
  document.getElementById('handName').textContent = `Hand: ${userHandName}`;

  // Display the next 5 cards for Doyle
  let doyleHand = deck.slice(5, 10).sort((a, b) => getCardValue(b) - getCardValue(a));
  const [doyleHandName, sortedDoyleHand, doyleRanks] = getDoyleHandName(doyleHand);
  for (let i = 0; i < sortedDoyleHand.length; i++) {
    let doyleCardElement = document.createElement('div');
    doyleCardElement.textContent = sortedDoyleHand[i];
    doyleCardElement.classList.add('card');
    doyleCardsElement.appendChild(doyleCardElement);
  }

  // Determine and display Doyle's poker hand here
  document.getElementById('doyleHandName').textContent = `Doyle's Hand: ${doyleHandName}`;

  // Compare the hands and display the result
  compareHands(userHandName, doyleHandName, sortedPlayerHand, sortedDoyleHand, playerRanks, doyleRanks);

  // Log the dealt cards to console
  console.log('User cards:', userHand);
  console.log('Hand name:', userHandName);
  console.log('Doyle cards:', doyleHand);
  console.log('Doyle Hand', doyleHandName);
}

// Function to get the numerical value of a card
function getCardValue(card) {
  const rank = card.slice(0, -1);
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  return ranks.indexOf(rank) + 2;
}

const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Determine the poker hand name
function getHandName(cards) {
  //Sort the hand using the new sorting function
  const [sortedHand, rankCount] = sortHand(cards);

  // Extract ranks and suits from the sorted hand
  const ranks = sortedHand.map(card => card[0]);
  const suits = sortedHand.map(card => card[1]);

  // Check for flush
  const isFlush = suits.every(suit => suit === suits[0]);


  // Check for straight
  const isStraight = ranks.every((rank, index) => rankOrder.indexOf(rank) === index + rankOrder.indexOf(ranks[0]));

  let name = 'High Card';

  // Check for specific hand combinations
  if (isFlush && isStraight) {
    // Royal Flush check
    if (ranks[0] === '10' && ranks[4] === 'A') {
      name = 'Royal Flush';
    }
    name = 'Straight Flush';
  } else if (Object.values(rankCount).includes(4)) {
    name = 'Four-Of-A-Kind';
  } else if (Object.values(rankCount).includes(3) && Object.values(rankCount).includes(2)) {
    name = 'Full House';
  } else if (isFlush) {
    name = 'Flush';
  } else if (isStraight) {
    name = 'Straight';
  } else if (Object.values(rankCount).includes(3)) {
    name = 'Three-Of-A-Kind';
  } else if (Object.values(rankCount).filter(count => count === 2).length === 2) {
    name = 'Two Pair';
  } else if (Object.values(rankCount).filter(count => count === 2).length === 1) {
    name = 'One Pair';
  }
  return [name, sortedHand, rankCount];
}

// Function to sort the hand
function sortHand(hand) {
  // Count the occurrences of each rank
  const rankCount = {};
  for (const card of hand) {
    const rank = card.slice(0, -1);
    if (rankCount[rank]) {
      rankCount[rank]++;
    } else {
      rankCount[rank] = 1;
    }
  }

  // Sort the cards based on rank count and rank value
  hand.sort((a, b) => {
    const countDiff = rankCount[b.slice(0, -1)] - rankCount[a.slice(0, -1)];
    if (countDiff !== 0) {
      return countDiff; // Sort by rank count first
    } else {
      // If rank counts are the same, sort by rank value
      return rankOrder.indexOf(b.slice(0, -1)) - rankOrder.indexOf(a.slice(0, -1));
    }
  });

  return [hand, rankCount];
}


// Function to determine Doyle's hand name
function getDoyleHandName(cards) {

  // Sort the hand using the new sorting function
  const [sortedHand, rankCount] = sortHand(cards);

  // Extract ranks and suits from the sorted hand
  const ranks = sortedHand.map(card => card[0]);
  const suits = sortedHand.map(card => card[1]);

  // Check for flush
  const isFlush = suits.every(suit => suit === suits[0]);

  // Check for straight
  const isStraight = ranks.every((rank, index) => rankOrder.indexOf(rank) === index + rankOrder.indexOf(ranks[0]));

  // Check for specific hand combinations
  let name = 'High Card';

  // Check for specific hand combinations
  if (isFlush && isStraight) {
    // Royal Flush check
    if (ranks[0] === '10' && ranks[4] === 'A') {
      name = 'Royal Flush';
    }
    name = 'Straight Flush';
  } else if (Object.values(rankCount).includes(4)) {
    name = 'Four-Of-A-Kind';
  } else if (Object.values(rankCount).includes(3) && Object.values(rankCount).includes(2)) {
    name = 'Full House';
  } else if (isFlush) {
    name = 'Flush';
  } else if (isStraight) {
    name = 'Straight';
  } else if (Object.values(rankCount).includes(3)) {
    name = 'Three-Of-A-Kind';
  } else if (Object.values(rankCount).filter(count => count === 2).length === 2) {
    name = 'Two Pair';
  } else if (Object.values(rankCount).filter(count => count === 2).length === 1) {
    name = 'One Pair';
  }
  return [name, sortedHand, rankCount];
}

// Compare hands and determine the winner
function compareHands(userHandName, doyleHandName, sortedPlayerHand, sortedDoyleHand, playerRanks, doyleRanks) {
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

  const userValue = handValues[userHandName];
  const doyleValue = handValues[doyleHandName];

  if (userValue > doyleValue) {
    alert('Congratulations! You win!');
  } else if (userValue < doyleValue) {
    alert('Doyle wins! Better luck next time!');
  } if (userValue === doyleValue) {
    // Assuming 'playerRanks' and 'doyleRanks' are arrays of integers representing card ranks in sorted order
    let winner = 'It\'s a tie!'; // Default message

    // Loop through the cards to find the first non-tie card
    for (let i = 0; i < sortedPlayerHand.length; i++) {
      let userCardValue = getCardValue(sortedPlayerHand[i]);
      console.log('user', userCardValue);
      let doyleCardValue = getCardValue(sortedDoyleHand[i]);
      console.log('dude', doyleCardValue);

      if (userCardValue > doyleCardValue) {
        winner = 'Congratulations! You win!';
        break;
      } else if (userCardValue < doyleCardValue) {
        winner = 'Doyle wins! Better luck next time!';
        break;
      }
    }

    alert(winner);
  }
}

// Shuffle function
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

