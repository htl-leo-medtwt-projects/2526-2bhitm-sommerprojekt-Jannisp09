/// <reference path="script_keyevents.js" />
/// <reference path="script-player.js" />

let LEVELS = {
    1: {
        element: document.getElementById("levelOne"),
        spawnX: 60,
        spawnY: 60
    },

    2: {
        element: document.getElementById("levelTwo"),
        spawnX: 100,
        spawnY: 100
    }
};

let CURRENT_LEVEL = null;

function hideAllLevels() {
    Object.values(LEVELS).forEach(level => {
        level.element.style.display = "none";
    });
}

function setLevel(levelNumber) {
    hideAllLevels();
    CURRENT_LEVEL = LEVELS[levelNumber];
    CURRENT_LEVEL.element.style.display = "grid";
    PLAYER.box.style.left = CURRENT_LEVEL.spawnX + "px";
    PLAYER.box.style.top = CURRENT_LEVEL.spawnY + "px";
    GAME_SCREEN.surface = CURRENT_LEVEL.element;
}

let nameInput = document.getElementById("nameInput");
let startScreen = document.getElementById("startScreen");
let settingScreen = document.getElementById("settingsScreen");
let musicIcon = document.getElementById("musicIcon");
let musicText = document.getElementById("musicText");
let setupScreen = document.getElementById("setupScreen");
let inventoryOverlay = document.getElementById("inventoryOverlay");
let levelTransition = document.getElementById("levelTransition");
let level1 = document.getElementById("levelOne");
let level2 = document.getElementById("levelTwo");
let levelImportant = document.getElementById("levelImportant");


// Dialoge
let dialoge = {
    level1: {
        dialog1: {
            text: "Haa? Wo bin ich hier? Ich muss sofort hier weg! Vielleicht sagen ja diese Symbole am Boden was aus!",
            speech: "./sound/dialoge/level1_1.mp3"
        },
        dialog2: {
            text: "Ich verstehe es nicht ganz? ... Warum bin ich hier? Und warum bin ich ein fetter Roboter?",
            speech: "./sound/dialoge/level1_2.mp3"
        },
        dialog3: {
            text: "Sehr gut! Jetzt müssen wir nur noch so weiter machen!",
            speech: "./sound/dialoge/level1_3.mp3"
        },
        dialog4: {
            text: "Oh nein! Was machst du da? Du musst die Symbole in der richtigen Reihenfolge eingeben!",
            speech: "./sound/dialoge/level1_4.mp3"
        }
    },

    level2: {
        dialog1: {
            text: "Oh mein Gott! Wie soll man das lösen können?",
            speech: "./sound/dialoge/level2_1.mp3"
        }
    }
};

function playDialog(d) {
    const el = document.getElementById("subtitle");
    el.innerText = d.text;
    el.style.display = "block";

    let audio = new Audio(d.speech);
    audio.play();

    // AI: Sobald der Dialog zu Ende ist, soll der Untertitel ausgeblendet werden
    audio.onended = function () {
        el.style.display = "none";
    };
}


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
levelTransition.style.display = "none";
levelImportant.style.display = "none";

// Library

let startBtn = document.getElementById("startBtn");
startBtn.style.animation = "none",

    gsap.from("#logo", {
        y: -100,
        opacity: 0,
        duration: 1
    });

gsap.from("#startBtn", {
    scale: 0,
    duration: 0.5,
    ease: "back.out(1.7)"
});

gsap.from("#settingBtn", {
    scale: 0,
    duration: 0.5,
    delay: 0.2,
    ease: "back.out(1.7)"
});


function startDisplay() {
    startScreen.style.display = "none";
    settingScreen.style.display = "none";
    setupScreen.style.display = "none";
    level1.style.display = "none";
    inventoryOverlay.style.display = "none";
    levelTransition.style.display = "none";
    levelImportant.style.display = "none";
}

function settings() {
    startScreen.style.display = "none";
    settingScreen.style.display = "grid";
    setupScreen.style.display = "none";
    level1.style.display = "none";
    inventoryOverlay.style.display = "none";
    levelImportant.style.display = "none";
    click.play();
}

function backToStart() {
    startScreen.style.display = "grid";
    settingScreen.style.display = "none";
    setupScreen.style.display = "none";
    level1.style.display = "none";
    inventoryOverlay.style.display = "none";
    levelImportant.style.display = "none";
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
    levelImportant.style.display = "none";
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

    gsap.from("#inventoryUI", {
        scale: 0.9,
        opacity: 0,
        duration: 0.5
    });
}

gsap.from("#solutionUI", {
    scale: 0.9,
    opacity: 0,
    duration: 0.5
});

let playerName = "";
let dialogues;
let cmdOverlay = document.getElementById("cmdOverlay");
let cmdText = document.getElementById("cmdText");
let cmdInput = document.getElementById("cmdInput");


function startGame() {
    startScreen.style.display = "none";
    settingScreen.style.display = "none";
    setupScreen.style.display = "none";
    levelImportant.style.display = "block";
    startAudio.play();
    playerName = nameInput.value;
    setLevel(1);
    playDialog(dialoge.level1.dialog1);

    if (!loopRunning) {
        loopRunning = true;
        gameLoop();
    }
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
let hpBarInner = document.getElementById("hpBarInner");
let hpText = document.getElementById("hpText");
let transitionVideo = document.getElementById("transitionVideo");

let wrong = new Audio('./sound/wrong.mp3');
let correct = new Audio('./sound/correct.mp3');

let hp = 100;
hpBarInner.style.width = "100%";
hpText.innerHTML = hp + "HP";


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
        correct.play();
        playDialog(dialoge.level1.dialog3);

        setTimeout(() => {
            solutionBoard.style.display = "none";
            solutionCircle.style.display = "none";
            levelTransition.style.display = "block";
            transitionVideo.currentTime = 0;
            transitionVideo.muted = false;
            transitionVideo.play();
        }, 4000);

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
        hpBarInner.style.width = (hp - 25) + "%";
        hpText.innerHTML = (hp - 25) + "HP";
        wrong.play();
        hp -= 25;

        function restartLevel1() {
            hp = 100;
            hpBarInner.style.width = "100%";
            hpText.innerHTML = hp + "HP";
            solution1_input_1.value = "";
            solution1_input_2.value = "";
            solution1_input_3.value = "";
            solutionBoard.style.display = "none";
            level1.style.display = "grid";
            PLAYER.box.style.left = "60px";
            PLAYER.box.style.top = "60px";
            playDialog(dialoge.level1.dialog4);
        }

        if (hp <= 0) {
            restartLevel1();
        }


        setTimeout(() => {
            solutionUI.style.color = "#00e5ff";
            solutionUI.style.border = "2px solid #00e5ff";
            solution1_input_1.style.border = "2px solid #00e5ff";
            solution1_input_1.style.color = "#00e5ff";
            solution1_input_1.style.boxShadow = "0 0 10px #00e5ff";
            solution1_input_2.style.border = "2px solid #00e5ff";
            solution1_input_2.style.color = "#00e5ff";
            solution1_input_2.style.boxShadow = "0 0 10px #00e5ff";
            solution1_input_3.style.border = "2px solid #00e5ff";
            solution1_input_3.style.color = "#00e5ff";
            solution1_input_3.style.boxShadow = "0 0 10px #00e5ff";

        }, 3000);
    }
}


// AI, wenn das Video zu Ende ist, soll es automatisch weitergehen
// Es funktioniert so, dass ein EventListener auf das "ended" Event des Videos hört. Sobald das Video zu Ende ist, wird die Funktion ausgeführt, die den Level-Transition-Bildschirm ausblendet, das erste Level ausblendet und das zweite Level anzeigt. Dadurch wird der Übergang zwischen den Levels nahtlos gestaltet, ohne dass der Spieler manuell eingreifen muss.
transitionVideo.addEventListener("ended", () => {
    levelTransition.style.display = "none";
    setLevel(2);
});
