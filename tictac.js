const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(cell, index));
});

resetBtn.addEventListener('click', resetGame);

function handleCellClick(cell, index) {
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.disabled = true; // disables the button after played

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    disableAllCells();
  } else if (gameState.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function disableAllCells() {
  cells.forEach(cell => cell.disabled = true);
}

function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
  });
}
