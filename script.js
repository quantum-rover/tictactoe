// Select elements
const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('reset-button');
const gameContainer = document.getElementById('game-container');
let isXTurn = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Create a result display element
const resultDisplay = document.createElement('div');
resultDisplay.id = 'result-display';
document.body.appendChild(resultDisplay);

// Winning combinations
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
    cell.classList.add(currentClass === 'X' ? 'x-move' : 'o-move');

    // Highlight last move
    cells.forEach(cell => cell.classList.remove('highlight'));
    cell.classList.add('highlight');

    // Check for win or draw
    if (checkWin(currentClass)) {
        highlightWinningCombination(currentClass);
        displayResult(`${currentClass} wins!`);
        disableBoard();
    } else if (board.every(cell => cell !== '')) {
        displayResult("It's a draw!");
        disableBoard();
    } else {
        isXTurn = !isXTurn; // Switch turns
    }
}

function checkWin(currentClass) {
    return winningCombinations.find(combination => {
        if (combination.every(index => board[index] === currentClass)) {
            return combination;
        }
        return false;
    });
}

function highlightWinningCombination(currentClass) {
    const winningCombination = checkWin(currentClass);
    if (winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
    }
}

function displayResult(message) {
    resultDisplay.textContent = message;
    resultDisplay.classList.add('show-result');
    setTimeout(() => {
        alert(message); // Pop-up notification
    }, 100);
}

function disableBoard() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('highlight', 'winning-cell', 'x-move', 'o-move');
    });
    resultDisplay.textContent = ''; // Clear the result message
    isXTurn = true;

    // Re-enable event listeners
    cells.forEach(cell => cell.addEventListener('click', handleClick));
}

// Add event listeners to cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetBoard);

// Add styles for coloring and better appearance
document.head.insertAdjacentHTML('beforeend', `
    <style>
        #game-container {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-gap: 5px;
            margin: 20px auto;
        }
        [data-cell] {
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            border: 2px solid #444;
            cursor: pointer;
            background-color: #f0f8ff;
        }
        .x-move {
            color: #e63946;
        }
        .o-move {
            color: #2a9d8f;
        }
        .highlight {
            background-color: #d3f8d3;
        }
        .winning-cell {
            background-color: #ffd700; /* Gold color */
        }
        #reset-button {
            margin: 20px;
            padding: 10px 20px;
            font-size: 1rem;
            background-color: #0077b6;
            color: #fff;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }
        #reset-button:hover {
            background-color: #005f7e;
        }
        #result-display {
            margin-top: 20px;
            font-size: 1.5rem;
            text-align: center;
            color: #333;
        }
        .show-result {
            animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
`);
