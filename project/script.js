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
    level1.style.display ="none";
    inventoryOverlay.style.display = "none";
    click.play();
}

function backToStart() {
    startScreen.style.display = "grid";
    settingScreen.style.display = "none";
    setupScreen.style.display = "none";
    level1.style.display ="none";
    inventoryOverlay.style.display = "none";
    click.play();
}

function startMusic() {
    audio.play();
    audio.volume = 0.5;
    musicIcon.innerHTML = "❚❚";
    musicText.innerHTML = "MUSIC ON";
    click.play();
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
    click.play();
}

function openInventory() {
    inventoryOverlay.style.display = "grid";
    console.log("Inventory geöffnet");
    click.play();
}

let playerName = "";
let dialogues;

let cmdOverlay = document.getElementById("cmdOverlay");
let cmdText = document.getElementById("cmdText");
let cmdInput = document.getElementById("cmdInput");


function startGame () {
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

