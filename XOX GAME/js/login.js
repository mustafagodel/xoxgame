const playerNamesForm = document.getElementById('playerNamesForm');
const playerXInput = document.getElementById('playerXInput');
const playerOInput = document.getElementById('playerOInput');
const startGameButton = document.getElementById('startGameButton');
const difficultySelect = document.getElementById('difficultySelect');
const singlePlayerButton = document.getElementById('singlePlayerButton');
const multiplayerButton = document.getElementById('multiplayerButton');

singlePlayerButton.addEventListener('click', () => {
    window.location.href = "login.html";
});
multiplayerButton.addEventListener('click', () => {
    window.location.href = "Login2.html";
});


function updateInputValues(playerXName, playerOName) {
    if (playerXName) {
        playerOInput.value = playerOName || "Computer";
    } else if (!playerOName) {
        playerOInput.value = "";
    }

    if (playerOName) {
        playerXInput.value = playerXName || "Computer";
    } else if (!playerXName) {
        playerXInput.value = "";
    }
}

playerXInput.addEventListener('input', () => {
    const playerXName = playerXInput.value.trim();
    const playerOName = playerOInput.value.trim();
    updateInputValues(playerXName, playerOName);
});

playerOInput.addEventListener('input', () => {
    const playerXName = playerXInput.value.trim();
    const playerOName = playerOInput.value.trim();
    updateInputValues(playerXName, playerOName);
});

difficultySelect.addEventListener('change', () => {
    const selectedDifficulty = difficultySelect.value;
    localStorage.setItem('selectedDifficulty', selectedDifficulty);
});

playerNamesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const playerXName = playerXInput.value;
    const playerOName = playerOInput.value;
    const selectedDifficulty = difficultySelect.value;

    localStorage.setItem('isSinglePlayerMode', !playerXName);
    localStorage.setItem('playerXName', playerXName);
    localStorage.setItem('playerOName', playerOName);
    

    if (selectedDifficulty === 'easy') {
        window.location.href = "index.html";
    } else if (selectedDifficulty === 'normal') {
        window.location.href = "normal.html";
    } else if (selectedDifficulty === 'impossibleAI') {
        window.location.href = "impossibleAI.html";
    }
});
playerXInput.addEventListener('click', () => {
    playerXInput.value = ""; 
    const playerOName = playerOInput.value.trim();
    updateInputValues("", playerOName); 
});

playerOInput.addEventListener('click', () => {
    playerOInput.value = ""; 
    const playerXName = playerXInput.value.trim();
    updateInputValues(playerXName, ""); 
});