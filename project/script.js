/// <reference path="script_keyevents.js" />
/// <reference path="script-player.js" />

let nameInput = document.getElementById("nameInput");
let startScreen = document.getElementById("startScreen");
let settingScreen = document.getElementById("settingsScreen");
let musicIcon = document.getElementById("musicIcon");
let musicText = document.getElementById("musicText");
let setupScreen = document.getElementById("setupScreen");
let inventoryOverlay = document.getElementById("inventoryOverlay");
let level1 = document.getElementById("levelOne");

// Audio
let audio = new Audio('./sound/bg-music.mp3');
let startAudio = new Audio('./sound/startGame_sound.mp3');
let click = new Audio('./sound/button.mp3');
let backClick = new Audio('./sound/button_2.mp3');

startScreen.style.display = "grid";
settingScreen.style.display = "none";
setupScreen.style.display = "none";
level1.style.display = "none";
inventoryOverlay.style.display = "none";


function startDisplay() {
    startScreen.style.display = "none";
    settingScreen.style.display = "none";
    setupScreen.style.display = "none";
    level1.style.display = "none";
    inventoryOverlay.style.display = "none";
}

function settings() {
    startScreen.style.display = "none";
    settingScreen.style.display = "grid";
    setupScreen.style.display = "none";
    level1.style.display = "none";
    inventoryOverlay.style.display = "none";
    click.play();
}

function backToStart() {
    startScreen.style.display = "grid";
    settingScreen.style.display = "none";
    setupScreen.style.display = "none";
    level1.style.display = "none";
    inventoryOverlay.style.display = "none";
    backClick.play();
}

function startMusic() {
    audio.play();
    audio.volume = 0.5;
    musicIcon.innerHTML = "❚❚";
    musicText.innerHTML = "MUSIC ON";
}

function startSetup() {
    startScreen.style.display = "none";
    settingScreen.style.display = "none";
    setupScreen.style.display = "grid";
    level1.style.display = "none";
    inventoryOverlay.style.display = "none";
    click.play();
}

function backToGame() {
    inventoryOverlay.style.display = "none";
    solutionBoard.style.display = "none";
    backClick.play();
}

function openInventory() {
    inventoryOverlay.style.display = "grid";
    click.play();
}

let playerName = "";
let dialogues;

let cmdOverlay = document.getElementById("cmdOverlay");
let cmdText = document.getElementById("cmdText");
let cmdInput = document.getElementById("cmdInput");


function startGame() {
    startScreen.style.display = "none";
    settingScreen.style.display = "none";
    setupScreen.style.display = "none";
    level1.style.display = "grid";
    startAudio.play();

    playerName = nameInput.value;
    console.log("Player Name: " + playerName);

    gameLoop();
}

let GAME_SCREEN = {
    surface: document.getElementById('levelOne'),
    surfaceScale: '100%',
    startScreen: document.getElementById('startScreen')
}

GAME_SCREEN.surface.style.transform = `scale(${parseFloat(GAME_SCREEN.surfaceScale) / 100 * (window.innerWidth / GAME_SCREEN.surface.clientWidth)})`;

let GAME_CONFIG = {
    gameSpeed: 24, // game loop refresh rate (pictures per second)
    characterSpeed: 5 // move offset in PX
}


// Level 1 Solution
let solution_level1 = [1, 2, 0];
let solution1_input_1 = document.getElementById("solution1_input_1");
let solution1_input_2 = document.getElementById("solution1_input_2");
let solution1_input_3 = document.getElementById("solution1_input_3");
let solution_acceptBtn = document.getElementById("solution_acceptBtn");
let solutionUI = document.getElementById("solutionUI");


function checkSolution1() {

    if (solution1_input_1.value == solution_level1[0] && solution1_input_2.value == solution_level1[1] && solution1_input_3.value == solution_level1[2]) {
        solutionUI.style.color = "green";
        solutionUI.style.border = "2px solid green";
        solution1_input_1.style.border = "2px solid green";
        solution1_input_1.style.color = "green";
        solution1_input_1.style.boxShadow = "0 0 10px green";
        solution1_input_2.style.border = "2px solid green";
        solution1_input_2.style.color = "green";
        solution1_input_2.style.boxShadow = "0 0 10px green";
        solution1_input_3.style.border = "2px solid green";
        solution1_input_3.style.color = "green";
        solution1_input_3.style.boxShadow = "0 0 10px green";
        solution_acceptBtn.style.display = "none";
    } else {
        solutionUI.style.color = "red";
        solutionUI.style.border = "2px solid red";
        solution1_input_1.style.border = "2px solid red";
        solution1_input_1.style.color = "red";
        solution1_input_1.style.boxShadow = "0 0 10px red";
        solution1_input_2.style.border = "2px solid red";
        solution1_input_2.style.color = "red";
        solution1_input_2.style.boxShadow = "0 0 10px red";
        solution1_input_3.style.border = "2px solid red";
        solution1_input_3.style.color = "red";
        solution1_input_3.style.boxShadow = "0 0 10px red";
    }
}