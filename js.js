// script.js

const cardsArray = [
    'A', 'A', 'B', 'B',
    'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F',
    'G', 'G', 'H', 'H'
  ];
  
  let moves = 0;
  let matchedPairs = 0;
  let flippedCards = [];
  let isProcessing = false;
  
  const gameContainer = document.getElementById('game-container');
  const moveCounter = document.getElementById('move-counter');
  const timerDisplay = document.getElementById('timer');
  
  let timer = 0;
  let timerInterval;
  
  // Shuffle cards
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  // Create cards dynamically
  function initializeGame() {
    const shuffledCards = shuffle(cardsArray);
    shuffledCards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card', 'hidden');
      cardElement.textContent = card;
      cardElement.addEventListener('click', handleCardClick);
      gameContainer.appendChild(cardElement);
    });
  
    // Start the timer
    startTimer();
  }
  
  function handleCardClick(e) {
    if (isProcessing) return;
  
    const clickedCard = e.target;
  
    // Prevent clicking on already matched cards
    if (!clickedCard.classList.contains('hidden')) return;
  
    clickedCard.classList.remove('hidden');
    flippedCards.push(clickedCard);
  
    if (flippedCards.length === 2) {
      isProcessing = true;
      moves++;
      moveCounter.textContent = moves;
  
      checkForMatch();
    }
  }
  
  function checkForMatch() {
    const [card1, card2] = flippedCards;
  
    if (card1.textContent === card2.textContent) {
      matchedPairs++;
      flippedCards = [];
      isProcessing = false;
  
      // Check if the game is complete
      if (matchedPairs === cardsArray.length / 2) {
        clearInterval(timerInterval);
        setTimeout(() => alert(`You won! Moves: ${moves}, Time: ${timer}s`), 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.add('hidden');
        card2.classList.add('hidden');
        flippedCards = [];
        isProcessing = false;
      }, 1000);
    }
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
      timerDisplay.textContent = timer;
    }, 1000);
  }
  
  // Initialize the game
  initializeGame();

  // script.js

// Select the reset button
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', resetGame);

function resetGame() {
  // Stop the timer
  clearInterval(timerInterval);

  // Reset variables
  moves = 0;
  matchedPairs = 0;
  flippedCards = [];
  timer = 0;

  // Reset the display
  moveCounter.textContent = moves;
  timerDisplay.textContent = timer;

  // Clear and rebuild the game grid
  gameContainer.innerHTML = '';
  initializeGame();
}

