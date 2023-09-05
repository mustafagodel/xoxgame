const x_class = 'cross';
const o_class = 'circle';
const comb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const playerXScoreElement = document.getElementById('playerXScore');
const playerOScoreElement = document.getElementById('playerOScore');

const playerXName = localStorage.getItem('playerXName');
const playerOName = localStorage.getItem('playerOName');
let playerXScore = parseInt(localStorage.getItem('playerXScore')) || 0;
let playerOScore = parseInt(localStorage.getItem('playerOScore')) || 0;

playerXScoreElement.textContent = `${playerXName}: ${playerXScore}`;
playerOScoreElement.textContent = `${playerOName}: ${playerOScore}`;

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const resultText = document.querySelector('.result-text');
const restartButton = document.getElementById('restartButton');
let turn;

const swapTurn = () => {
    turn = !turn;
};

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
};

const placeHover = () => {
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    if (turn) board.classList.add(o_class);
    else board.classList.add(x_class);
};

const endGame = (draw) => {
    if (draw) {
        resultText.innerText = 'Draw';
    } else {
        let winnerName = '';

        if (win(x_class)) {
            winnerName = playerXName;
        } else if (win(o_class)) {
            winnerName = playerOName;
        }

        if (winnerName !== '') {
            const winnerScoreElement = winnerName === playerXName ? playerXScoreElement : playerOScoreElement;

            resultText.innerText = `${winnerName} Round Wins`;

            if (winnerName === playerXName) {
                playerXScore++;
            } else {
                playerOScore++;
            }

            winnerScoreElement.textContent = `${winnerName}: ${winnerName === playerXName ? playerXScore : playerOScore}`;

            if (playerXScore >= 5 || playerOScore >= 5) {
                endFinalGame();
                return;
            }
        }
    }
    result.classList.add('show');
};

const endFinalGame = () => {
    setTimeout(() => {
        playerXScore = 0;
        playerOScore = 0;
        playerXScoreElement.textContent = `${playerXName}: ${playerXScore}`;
        playerOScoreElement.textContent = `${playerOName}: ${playerOScore}`;
        resetGame();
        startGame();
    }, 2000);

    let winnerName = '';
    if (playerXScore >= 5) {
        winnerName = playerXName;
    } else if (playerOScore >= 5) {
        winnerName = playerOName;
    }

    if (winnerName !== '') {
        resultText.innerText = `${winnerName} Game Wins!`;
        result.classList.add('show');
    }
};

const isTie = () => {
    return [...cells].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class);
    });
};

const win = (currentClass) => {
    return comb.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

const Click = (e) => {
    const cell = e.target;
    const currentClass = turn ? o_class : x_class;
    if (cell.classList.contains(x_class) || cell.classList.contains(o_class)) {
        return;
    }
    placeMark(cell, currentClass);
    if (win(currentClass)) {
        endGame(false);
    } else if (isTie()) {
        endGame(true);
    } else {
        swapTurn();
        aiMove();
    }
};

const resetGame = () => {
    cells.forEach(cell => {
        cell.classList.remove(o_class);
        cell.classList.remove(x_class);
        cell.removeEventListener('click', Click);
        cell.addEventListener('click', Click, { once: true });
    });
};

const getRandomEmptyCell = () => {
    const emptyCells = [...cells].filter(cell => !cell.classList.contains(x_class) && !cell.classList.contains(o_class));
    if (emptyCells.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
};          

const minimax = (board, depth, isMaximizing) => {
    const scores = {
        [x_class]: -1,
        [o_class]: 1,
        'tie': 0,
    };

    if (win(x_class)) {
        return scores[x_class] - depth;
    }
    if (win(o_class)) {
        return scores[o_class] + depth;
    }
    if (isTie()) {
        return scores['tie'];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i].classList.contains(x_class) && !board[i].classList.contains(o_class)) {
                board[i].classList.add(o_class);
                let score = minimax([...board], depth + 1, false);
                board[i].classList.remove(o_class);
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (!board[i].classList.contains(x_class) && !board[i].classList.contains(o_class)) {
                board[i].classList.add(x_class);
                let score = minimax([...board], depth + 1, true);
                board[i].classList.remove(x_class);
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

const aiMove = () => {
    const currentClass = turn ? o_class : x_class;
    let moveMade = false; 

    if (!moveMade) {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (!cell.classList.contains(x_class) && !cell.classList.contains(o_class)) {
                cell.classList.add(currentClass);
                const score = minimax([...cells], 0, false);
                cell.classList.remove(currentClass);

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = cell;
                }
            }
        }

        if (bestMove) {
            placeMark(bestMove, currentClass);
            moveMade = true;
        }
    }

    if (win(currentClass)) {
        endGame(false);
    } else if (isTie()) {
        endGame(true);
    } else {
        swapTurn();
        placeHover();
    }
};

const startGame = () => {
    if (playerXName === 'Computer') {
        turn = false; 
        resetGame();
        placeHover();
        result.classList.remove('show');
        aiMove(); 
    } else {
        turn = false;
        resetGame();
        placeHover();
        result.classList.remove('show');
    }
};

startGame();
restartButton.addEventListener('click', startGame);
