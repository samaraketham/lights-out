const boardSize = 5;
let board = [];

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  for (let i = 0; i < boardSize * boardSize; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.index = i;
    square.addEventListener('click', () => toggleSquare(i));
    gameBoard.appendChild(square);
    board.push(true); // Initialize all squares as 'on' (true)
  }

  // Generate solvable random board by simulating random clicks
  for (let i = 0; i < boardSize * boardSize; i++) {
    const randomIndex = Math.floor(Math.random() * (boardSize * boardSize));
    toggleSquare(randomIndex);
  }
}

function toggleSquare(index) {
  const squares = document.querySelectorAll('.square');
  const clickedSquare = squares[index];
  const clickedIndex = parseInt(clickedSquare.dataset.index);

  board[clickedIndex] = !board[clickedIndex];
  clickedSquare.classList.toggle('is-off');

  // Toggle adjacent squares
  const adjacentIndices = getAdjacentIndices(clickedIndex);
  adjacentIndices.forEach(adjIndex => {
    board[adjIndex] = !board[adjIndex];
    squares[adjIndex].classList.toggle('is-off');
  });

  checkWin();
}

function getAdjacentIndices(index) {
  const indices = [];
  const isLeftEdge = (index % boardSize === 0);
  const isRightEdge = (index % boardSize === boardSize - 1);

  if (index >= boardSize) indices.push(index - boardSize); // Up
  if (index < boardSize * (boardSize - 1)) indices.push(index + boardSize); // Down
  if (!isLeftEdge) indices.push(index - 1); // Left
  if (!isRightEdge) indices.push(index + 1); // Right

  return indices;
}

function checkWin() {
  const isGameWon = board.every(square => !square);
  if (isGameWon) {
    alert('Congratulations! You won!');
  }
}

function resetBoard() {
  board = [];
  createBoard();
}

// Initialize the game
createBoard();
