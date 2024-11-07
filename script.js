const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('reset-button');
let isXTurn = true;
let board = ['', '', '', '', '', '', '', '', ''];

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

    board[cellIndex] = currentClass;
    cell.textContent = currentClass;
    
    if (checkWin(currentClass)) {
        alert(`${currentClass} wins!`);
        resetBoard();
    } else if (board.every(cell => cell !== '')) {
        alert("It's a draw!");
        resetBoard();
    } else {
        isXTurn = !isXTurn; // Switch turns
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentClass);
    });
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    isXTurn = true;
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetBoard);
