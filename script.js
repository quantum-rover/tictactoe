const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('reset-button');
let isXTurn = true;
let board = ['', '', '', '', '', '', '', '', ''];
let resultDisplay = document.createElement('div'); // Create a result display element
document.body.appendChild(resultDisplay); // Append it to the body

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'X' : 'O';
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '') return; // Prevent overwriting moves

    // Update the game state
    board[cellIndex] = currentClass;
    cell.textContent = currentClass;

    // Highlight last move
    cells.forEach(cell => cell.classList.remove('highlight'));
    cell.classList.add('highlight');

    // Check for win or draw
    if (checkWin(currentClass)) {
        resultDisplay.textContent = `${currentClass} wins!`;
        disableBoard();
    } else if (board.every(cell => cell !== '')) {
        resultDisplay.textContent = "It's a draw!";
        disableBoard();
    } else {
        isXTurn = !isXTurn; // Switch turns
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentClass);
    });
}

function disableBoard() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('highlight');
    });
    resultDisplay.textContent = ''; // Clear the result message
    isXTurn = true;

    // Re-enable event listeners
    cells.forEach(cell => cell.addEventListener('click', handleClick));
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetBoard);
