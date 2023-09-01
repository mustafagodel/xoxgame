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
        resultText.innerText = 'Tie Game';
    } else {
        resultText.innerText = `${turn ? playerOName : playerXName} Winner`;
        if (turn) {
            playerOScore++;
            playerOScoreElement.textContent = `${playerOName}: ${playerOScore}`;
            if (playerOScore >= 5) {
                resultText.innerText = `${playerOName} Wins the Game!`;
                endFinalGame();
                return; 
            }
        } else {
            playerXScore++;
            playerXScoreElement.textContent = `${playerXName}: ${playerXScore}`;
            if (playerXScore >= 5) {
                resultText.innerText = `${playerXName} Wins the Game!`;
                endFinalGame();
                return; 
            }
        }
    }
    result.classList.add('show');
 
};

const endFinalGame = () => {
    let winnerName = '';
    if (playerXScore >= 5) {
        winnerName = playerXName;
        resultText.innerText = `${winnerName} Wins the Game!`;
            result.classList.add('show');
    } else if (playerOScore >= 5) {
        winnerName = playerOName;
        resultText.innerText = `${winnerName} Wins the Game!`;
        result.classList.add('show');
    }
    
    setTimeout(() => {
     
        playerXScore = 0;
        playerOScore = 0;
        playerXScoreElement.textContent = `${playerXName}: ${playerXScore}`;
        playerOScoreElement.textContent = `${playerOName}: ${playerOScore}`;
        
        resetGame();
        startGame();
    }, 2000);
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

// ... (Yukarıdaki kod)

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
        placeHover();
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

const startGame = () => {
    turn = false;
    resetGame();
    placeHover();
    result.classList.remove('show');
};

startGame();
restartButton.addEventListener('click', startGame);



// Tıklanabilir hücreler için gerekli kod
cells.forEach(cell => {
    cell.addEventListener('click', Click, { once: true });
});
