// initialization of the game
let scoreBoard = ['','','','','','','','',''];
let currentPlayer = 'X';
let isGameOn = true;
let winningProbablities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//retrieve the dom elements
let gamecells = document.querySelectorAll('.gamecell');
let resetBtn = document.getElementById('resetbtn');
let gameStatus = document.getElementById('gamestatus');
let tempCurrentPlayer = document.getElementById('currentplayer');


// Add Event Listeners to each cell and reset button
gamecells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');
   if (scoreBoard[index] !== '' || !isGameOn) {
        return;
    }

    scoreBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    checkGameResult() 

     // Switch player
    if (isGameOn) {
        currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
        tempCurrentPlayer.textContent = currentPlayer;
        tempCurrentPlayer.classList.remove(currentPlayer === 'X' ? 'o' : 'x');
        tempCurrentPlayer.classList.add(currentPlayer.toLowerCase());
    }

}


// Check Game Result
function checkGameResult() {
    let roundWon = false;
    let winningIndices = [];

    for (let i = 0; i < winningProbablities.length; i++) {
        const [a, b, c] = winningProbablities[i];
        const cellA = scoreBoard[a];
        const cellB = scoreBoard[b];
        const cellC = scoreBoard[c];

        if (cellA == '' || cellB == '' || cellC == '') {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            winningIndices = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `${currentPlayer} has Won!`;
        isGameOn = false;
        // Highlight winning cells
        winningIndices.forEach(index => {
            gamecells[index].classList.add('winner');
        });
        return;
    }

    // Check for Draw
    if (!scoreBoard.includes('')) {
        gameStatus.textContent = "It's a Draw!";
        isGameOn = false;
        return;
    }
}


function resetGame(e) {
scoreBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOn = true;
    gameStatus.textContent = '';
    tempCurrentPlayer.textContent = 'X';
    tempCurrentPlayer.classList.remove('o');

    gamecells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });}