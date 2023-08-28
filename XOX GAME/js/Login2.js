const playerNamesForm = document.getElementById('playerNamesForm');
const playerXInput = document.getElementById('playerXInput');
const playerOInput = document.getElementById('playerOInput');
const startGameButton = document.getElementById('startGameButton');
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
        playerOInput.value = playerOName || "";
    } else if (!playerOName) {
        playerOInput.value = "";
    }

    if (playerOName) {
        playerXInput.value = playerXName || "";
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


playerNamesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const playerXName = playerXInput.value;
    const playerOName = playerOInput.value;


 
    localStorage.setItem('playerXName', playerXName);
    localStorage.setItem('playerOName', playerOName);


    window.location.href = "multi.html";

   
});
