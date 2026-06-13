/// <reference path="script_keyevents.js" />
/// <reference path="script-player.js" />

let currentPlayerName = "";

function getAllSaves() {
    return JSON.parse(localStorage.getItem("protocol_savegames")) || {};
}

function saveGame() {
    let saves = getAllSaves();
    saves[currentPlayerName] = {
        hp: hp,
        level: CURRENT_LEVEL_NUMBER,
        inventory: inventory
    };
    localStorage.setItem("protocol_savegames", JSON.stringify(saves));
    click.currentTime = 0;
    click.play();
}

function loadGame(playerName) {
    let saves = getAllSaves();

    if (saves[playerName]) {
        currentPlayerName = playerName;
        hp = saves[playerName].hp;
        inventory = saves[playerName].inventory;
        hpBarInner.style.width = hp + "%";
        hpText.innerHTML = hp + "HP";
        setLevel(saves[playerName].level);
        click.currentTime = 0;
        click.play();
    }
    else {
        wrong.currentTime = 0;
        wrong.play();
    }
}


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
    },

    3: {
        element: document.getElementById("levelThree"),
        spawnX: 602,
        spawnY: 250
    },

    4: {
        element: document.getElementById("finalLevel"),
        spawnX: 602,
        spawnY: 250
    },

    5: {
        element: document.getElementById("final_subroom"),
        spawnX: 200,
        spawnY: 200
    }
};

let CURRENT_LEVEL = null;
let CURRENT_LEVEL_NUMBER = 1;

function hideAllLevels() {
    // KI: Alle Level-Elemente ausblenden
    Object.values(LEVELS).forEach(level => {
        level.element.style.display = "none";
    });
}

function saveControlSettings() {
    CONTROL_SETTINGS.arrowKeys = document.getElementById("arrowKeysCheckbox").checked;
    CONTROL_SETTINGS.wasd = document.getElementById("wasdCheckbox").checked;
    localStorage.setItem("controlSettings", JSON.stringify(CONTROL_SETTINGS));
}


let Inventory = {
    items: [
        keyObject = {
            name: "Key",
            image: "./img/key.webp"
        },
        accessCard = {
            name: "AccessCard",
            image: "./img/accessCard.png"
        },
        solutionPaper = {
            name: "SolutionPaper",
            image: "./img/placeholder.png"
        }]
}

function updateInventory() {
    let foundSomething = false;
    document.getElementById("slotKey").style.display = "none";
    document.getElementById("slotAccessCard").style.display = "none";
    document.getElementById("slotSolutionPaper").style.display = "none";

    if (inventory.includes("KeyObject")) {
        document.getElementById("slotKey").style.display = "flex";
        foundSomething = true;
    }

    if (inventory.includes("AccessCard")) {
        document.getElementById("slotAccessCard").style.display = "flex";
        foundSomething = true;
    }

    if (inventory.includes("SolutionPaper")) {
        document.getElementById("slotSolutionPaper").style.display = "flex";
        foundSomething = true;
    }

    document.getElementById("nothingFound").style.display =
        foundSomething ? "none" : "block";
}

function setLevel(levelNumber) {
    hideAllLevels();
    CURRENT_LEVEL = LEVELS[levelNumber];
    CURRENT_LEVEL_NUMBER = levelNumber;
    CURRENT_LEVEL.element.style.display = "grid";
    PLAYER.box.style.left = CURRENT_LEVEL.spawnX + "px";
    PLAYER.box.style.top = CURRENT_LEVEL.spawnY + "px";
    GAME_SCREEN.surface = CURRENT_LEVEL.element;
    levelBoxLeft.innerText = levelNumber;
    correct.currentTime = 0;
    correct.play();

    if (levelNumber === 3) {
        specialSolutionOverlay.style.display = "flex";
    } else {
        specialSolutionOverlay.style.display = "none";
    }
}

let nameInput = document.getElementById("nameInput");
let saveSelect = document.getElementById("saveSelect");
let startScreen = document.getElementById("startScreen");
let settingScreen = document.getElementById("settingsScreen");
let musicIcon = document.getElementById("musicIcon");
let musicText = document.getElementById("musicText");
let setupScreen = document.getElementById("setupScreen");
let inventoryOverlay = document.getElementById("inventoryOverlay");
let levelTransition = document.getElementById("levelTransition");
let level1 = document.getElementById("levelOne");
let level2 = document.getElementById("levelTwo");
let level3 = document.getElementById("levelThree");
let levelImportant = document.getElementById("levelImportant");
let levelBoxLeft = document.getElementById("levelBoxLeft");


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
    },

    level3: {
        dialog2: {
            text: "Willkommen zu deinem Experiment! Hoffentlich bringt dich dieses Rätsel zum scheitern!",
            speech: "./sound/dialoge/woman1.mp3"
        }
    },
    final: {
        dialog2: {
            text: "Wo bin ich denn jetzt hingefallen? Gibt es hier einen Lichtschalter? (...) Achja hier.",
            speech: "./sound/dialoge/final_fall.mp3"
        },

        dialog3: {
            text: "Hmmm.... Hier gibt es ja einige Objekte..... Welches soll ich denn nur nehmen?",
            speech: "./sound/dialoge/final_tip.mp3"
        }
    }
};

function playDialog(something) {
    let sub = document.getElementById("subtitle");
    sub.innerText = something.text;
    sub.style.display = "block";

    let audio = new Audio(something.speech);
    audio.play();

    // AI: Sobald der Dialog zu Ende ist, soll der Untertitel ausgeblendet werden
    audio.onended = function () {
        sub.style.display = "none";
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
level2.style.display = "none";
level3.style.display = "none";
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

    document.getElementById("arrowKeysCheckbox").checked =
        CONTROL_SETTINGS.arrowKeys;

    document.getElementById("wasdCheckbox").checked =
        CONTROL_SETTINGS.wasd;

    click.play();
}

function backToStart() {
    saveControlSettings();
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
    audio.volume = 0.1;
    musicIcon.innerHTML = "❚❚";
    musicText.innerHTML = "MUSIC ON";
}

function loadSaveNames() {
    let saves = getAllSaves();
    saveSelect.innerHTML = '<option value="">Select Savegame</option>';

    Object.keys(saves).forEach(saveName => {
        saveSelect.innerHTML += `<option value="${saveName}">${saveName}</option>`;
    });
}

function selectSavegame() {
    if (saveSelect.value != "") {
        nameInput.value = saveSelect.value;
        click.currentTime = 0;
        click.play();
    }
}

function startSetup() {
    startScreen.style.display = "none";
    settingScreen.style.display = "none";
    setupScreen.style.display = "grid";
    level1.style.display = "none";
    inventoryOverlay.style.display = "none";
    levelImportant.style.display = "none";
    click.play();
    loadSaveNames();
}

function backToGame() {
    inventoryOverlay.style.display = "none";
    solutionBoard.style.display = "none";
    solutionBoard2.style.display = "none";
    solutionBoard3.style.display = "none";
    solutionBoardLvlTwo.style.display = "none";
    backClick.play();
}

function openInventory() {
    inventoryOverlay.style.display = "grid";
    click.play();
    updateInventory();

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

let inventory = [];

function startGame() {
    startScreen.style.display = "none";
    settingScreen.style.display = "none";
    setupScreen.style.display = "none";
    levelImportant.style.display = "block";
    startAudio.play();
    currentPlayerName = nameInput.value;
    playerName = nameInput.value;

    if (!loopRunning) {
        loopRunning = true;
        gameLoop();
    }

    let saves = getAllSaves();

    if (saves[currentPlayerName]) {
        loadGame(currentPlayerName);
    } else {
        hp = 100;
        inventory = [];
        setLevel(1);
        saveGame();
        playDialog(dialoge.level1.dialog1);
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

let solution_level1 = [1, 2, 0];
let solution_level2 = ['G', 'G', 'G', 'G', 'R'];
let solution_level3 = [0, 2, 3, 1, 0, 4];
let solution1_input_1 = document.getElementById("solution1_input_1");
let solution1_input_2 = document.getElementById("solution1_input_2");
let solution1_input_3 = document.getElementById("solution1_input_3");
let solution2_input_1 = document.getElementById("solution2_input_1");
let solution2_input_2 = document.getElementById("solution2_input_2");
let solution2_input_3 = document.getElementById("solution2_input_3");
let solution2_input_4 = document.getElementById("solution2_input_4");
let solution2_input_5 = document.getElementById("solution2_input_5");
let solution3_input_1 = document.getElementById("solution3_input_1");
let solution3_input_2 = document.getElementById("solution3_input_2");
let solution3_input_3 = document.getElementById("solution3_input_3");
let solution3_input_4 = document.getElementById("solution3_input_4");
let solution3_input_5 = document.getElementById("solution3_input_5");
let solution3_input_6 = document.getElementById("solution3_input_6");
let solution_acceptBtn = document.getElementById("solution_acceptBtn");
let solutionUI = document.getElementById("solutionUI");
let hpBarInner = document.getElementById("hpBarInner");
let hpText = document.getElementById("hpText");
let transitionVideo = document.getElementById("transitionVideo");

let solutionBoardLvlThree = document.getElementById("solutionBoardLvlThree");

function backToLevelThreeChoice() {
    solutionBoardLvlThree.style.display = "none";
    specialSolutionOverlay.style.display = "flex";
    backClick.play();
}

function solutionThree() {
    specialSolutionOverlay.style.display = "none";
    solutionBoardLvlThree.style.display = "flex";
    click.currentTime = 0;
    click.play();
}

function haveALook() {
    specialSolutionOverlay.style.display = "none";
    backClick.currentTime = 0;
    backClick.play();
}

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
        saveGame();

        function restartLevel1() {
            wrong.currentTime = 0;
            wrong.play();
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
            saveGame();
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

function checkSolution2() {
    if (solution2_input_1.value == solution_level2[0] && solution2_input_2.value == solution_level2[1] && solution2_input_3.value == solution_level2[2] && solution2_input_4.value == solution_level2[3] && solution2_input_5.value == solution_level2[4]) {

        solutionUI.style.color = "green";
        solutionUI.style.border = "2px solid green";

        solution2_input_1.style.border = "2px solid green";
        solution2_input_1.style.color = "green";
        solution2_input_1.style.boxShadow = "0 0 10px green";

        solution2_input_2.style.border = "2px solid green";
        solution2_input_2.style.color = "green";
        solution2_input_2.style.boxShadow = "0 0 10px green";

        solution2_input_3.style.border = "2px solid green";
        solution2_input_3.style.color = "green";
        solution2_input_3.style.boxShadow = "0 0 10px green";

        solution2_input_4.style.border = "2px solid green";
        solution2_input_4.style.color = "green";
        solution2_input_4.style.boxShadow = "0 0 10px green";

        solution2_input_5.style.border = "2px solid green";
        solution2_input_5.style.color = "green";
        solution2_input_5.style.boxShadow = "0 0 10px green";

        correct.play();
        saveGame();

        setTimeout(() => {
            solutionBoardLvlTwo.style.display = "none";
            levelTransition.style.display = "block";
            transitionVideo.currentTime = 0;
            transitionVideo.muted = false;
            transitionVideo.play();
        }, 4000);

    } else {

        solutionUI.style.color = "red";
        solutionUI.style.border = "2px solid red";

        solution2_input_1.style.border = "2px solid red";
        solution2_input_1.style.color = "red";
        solution2_input_1.style.boxShadow = "0 0 10px red";

        solution2_input_2.style.border = "2px solid red";
        solution2_input_2.style.color = "red";
        solution2_input_2.style.boxShadow = "0 0 10px red";

        solution2_input_3.style.border = "2px solid red";
        solution2_input_3.style.color = "red";
        solution2_input_3.style.boxShadow = "0 0 10px red";

        solution2_input_4.style.border = "2px solid red";
        solution2_input_4.style.color = "red";
        solution2_input_4.style.boxShadow = "0 0 10px red";

        solution2_input_5.style.border = "2px solid red";
        solution2_input_5.style.color = "red";
        solution2_input_5.style.boxShadow = "0 0 10px red";

        hpBarInner.style.width = (hp - 25) + "%";
        hpText.innerHTML = (hp - 25) + "HP";

        wrong.play();
        hp -= 25;

        saveGame();

        function restartLevel2() {
            wrong.currentTime = 0;
            wrong.play();
            hp = 100;

            hpBarInner.style.width = "100%";
            hpText.innerHTML = hp + "HP";

            solution2_input_1.value = "";
            solution2_input_2.value = "";
            solution2_input_3.value = "";
            solution2_input_4.value = "";
            solution2_input_5.value = "";

            solutionBoardLvlTwo.style.display = "none";
            level2.style.display = "grid";

            PLAYER.box.style.left = "100px";
            PLAYER.box.style.top = "100px";

            saveGame();
        }

        if (hp <= 0) {
            restartLevel2();
        }

        setTimeout(() => {
            solutionUI.style.color = "#00e5ff";
            solutionUI.style.border = "2px solid #00e5ff";

            solution2_input_1.style.border = "2px solid #00e5ff";
            solution2_input_1.style.color = "#00e5ff";
            solution2_input_1.style.boxShadow = "0 0 10px #00e5ff";

            solution2_input_2.style.border = "2px solid #00e5ff";
            solution2_input_2.style.color = "#00e5ff";
            solution2_input_2.style.boxShadow = "0 0 10px #00e5ff";

            solution2_input_3.style.border = "2px solid #00e5ff";
            solution2_input_3.style.color = "#00e5ff";
            solution2_input_3.style.boxShadow = "0 0 10px #00e5ff";

            solution2_input_4.style.border = "2px solid #00e5ff";
            solution2_input_4.style.color = "#00e5ff";
            solution2_input_4.style.boxShadow = "0 0 10px #00e5ff";

            solution2_input_5.style.border = "2px solid #00e5ff";
            solution2_input_5.style.color = "#00e5ff";
            solution2_input_5.style.boxShadow = "0 0 10px #00e5ff";

        }, 3000);
    }
}

function checkSolution3() {
    if (solution3_input_1.value == solution_level3[0] && solution3_input_2.value == solution_level3[1] && solution3_input_3.value == solution_level3[2] && solution3_input_4.value == solution_level3[3] && solution3_input_5.value == solution_level3[4] && solution3_input_6.value == solution_level3[5]) {

        solutionUI.style.color = "green";
        solutionUI.style.border = "2px solid green";

        solution3_input_1.style.border = "2px solid green";
        solution3_input_1.style.color = "green";
        solution3_input_1.style.boxShadow = "0 0 10px green";

        solution3_input_2.style.border = "2px solid green";
        solution3_input_2.style.color = "green";
        solution3_input_2.style.boxShadow = "0 0 10px green";

        solution3_input_3.style.border = "2px solid green";
        solution3_input_3.style.color = "green";
        solution3_input_3.style.boxShadow = "0 0 10px green";

        solution3_input_4.style.border = "2px solid green";
        solution3_input_4.style.color = "green";
        solution3_input_4.style.boxShadow = "0 0 10px green";

        solution3_input_5.style.border = "2px solid green";
        solution3_input_5.style.color = "green";
        solution3_input_5.style.boxShadow = "0 0 10px green";

        solution3_input_6.style.border = "2px solid green";
        solution3_input_6.style.color = "green";
        solution3_input_6.style.boxShadow = "0 0 10px green";

        correct.play();
        saveGame();

        setTimeout(() => {
            solutionBoardLvlThree.style.display = "none";
            specialSolutionOverlay.style.display = "none";
            levelTransition.style.display = "block";

            transitionVideo.currentTime = 0;
            transitionVideo.muted = false;
            transitionVideo.play();
        }, 4000);

    } else {

        solutionUI.style.color = "red";
        solutionUI.style.border = "2px solid red";

        solution3_input_1.style.border = "2px solid red";
        solution3_input_1.style.color = "red";
        solution3_input_1.style.boxShadow = "0 0 10px red";

        solution3_input_2.style.border = "2px solid red";
        solution3_input_2.style.color = "red";
        solution3_input_2.style.boxShadow = "0 0 10px red";

        solution3_input_3.style.border = "2px solid red";
        solution3_input_3.style.color = "red";
        solution3_input_3.style.boxShadow = "0 0 10px red";

        solution3_input_4.style.border = "2px solid red";
        solution3_input_4.style.color = "red";
        solution3_input_4.style.boxShadow = "0 0 10px red";

        solution3_input_5.style.border = "2px solid red";
        solution3_input_5.style.color = "red";
        solution3_input_5.style.boxShadow = "0 0 10px red";

        solution3_input_6.style.border = "2px solid red";
        solution3_input_6.style.color = "red";
        solution3_input_6.style.boxShadow = "0 0 10px red";

        hpBarInner.style.width = (hp - 25) + "%";
        hpText.innerHTML = (hp - 25) + "HP";

        wrong.play();
        hp -= 25;

        saveGame();

        function restartLevel3() {
            wrong.currentTime = 0;
            wrong.play();
            hp = 100;

            hpBarInner.style.width = "100%";
            hpText.innerHTML = hp + "HP";

            solution3_input_1.value = "";
            solution3_input_2.value = "";
            solution3_input_3.value = "";
            solution3_input_4.value = "";
            solution3_input_5.value = "";
            solution3_input_6.value = "";

            solutionBoardLvlThree.style.display = "none";
            specialSolutionOverlay.style.display = "flex";

            PLAYER.box.style.left = "602px";
            PLAYER.box.style.top = "250px";

            saveGame();
        }

        if (hp <= 0) {
            restartLevel3();
        }

        setTimeout(() => {
            solutionUI.style.color = "#00e5ff";
            solutionUI.style.border = "2px solid #00e5ff";

            solution3_input_1.style.border = "2px solid #00e5ff";
            solution3_input_1.style.color = "#00e5ff";
            solution3_input_1.style.boxShadow = "0 0 10px #00e5ff";

            solution3_input_2.style.border = "2px solid #00e5ff";
            solution3_input_2.style.color = "#00e5ff";
            solution3_input_2.style.boxShadow = "0 0 10px #00e5ff";

            solution3_input_3.style.border = "2px solid #00e5ff";
            solution3_input_3.style.color = "#00e5ff";
            solution3_input_3.style.boxShadow = "0 0 10px #00e5ff";

            solution3_input_4.style.border = "2px solid #00e5ff";
            solution3_input_4.style.color = "#00e5ff";
            solution3_input_4.style.boxShadow = "0 0 10px #00e5ff";

            solution3_input_5.style.border = "2px solid #00e5ff";
            solution3_input_5.style.color = "#00e5ff";
            solution3_input_5.style.boxShadow = "0 0 10px #00e5ff";

            solution3_input_6.style.border = "2px solid #00e5ff";
            solution3_input_6.style.color = "#00e5ff";
            solution3_input_6.style.boxShadow = "0 0 10px #00e5ff";

        }, 3000);
    }
}

function openDeleteMenu() {
    let saves = getAllSaves();
    let select = document.getElementById("deleteSaveSelect");
    select.innerHTML =
        '<option value="">Select Savegame</option>';
    Object.keys(saves).forEach(saveName => {
        select.innerHTML +=
            `<option value="${saveName}">
                ${saveName}
            </option>`;
    });
    document.getElementById("deleteMenu").style.display = "block";
    click.play();
}

function deleteSelectedSave() {
    let selected = document.getElementById("deleteSaveSelect").value;

    if (selected === "") {
        return;
    }
    let saves = getAllSaves();
    delete saves[selected];

    localStorage.setItem("protocol_savegames", JSON.stringify(saves));
    showDeleteFeedback(selected);
    backClick.play();
    openDeleteMenu();
}

function showDeleteFeedback(playerName) {
    let feedback = document.getElementById("deleteFeedback");
    feedback.innerHTML = playerName + " was deleted";
    feedback.style.opacity = "1";
    setTimeout(() => {
        feedback.style.opacity = "0";
    }, 4000);
}

function openSubroom() {
    setLevel(5);
    playDialog(dialoge.final.dialog3);
    document.getElementById("player").style.display = "none";
}

function showBlackScreen() {
    let blackScreen = document.getElementById("blackScreen");
    blackScreen.style.display = "block";
    playDialog(dialoge.final.dialog2);

    setTimeout(() => {
        blackScreen.style.display = "none";
        openSubroom();
    }, 6000);
}

function getEntranceCard() {
    inventory.push("AccessCard");
    correct.play();
    let box = document.getElementById("itemFoundBox");
    box.style.display = "flex";
    gsap.fromTo(box,
        {
            y: -150,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out"
        }
    );
    click.currentTime = 0;
    click.play();
    setTimeout(() => {
        gsap.to(box, {
            y: -150,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            onComplete: function () {
                box.style.display = "none";
            }
        });
    }, 4000);
    document.getElementById("objectColl2").style.display = "none";
    document.getElementById("arrow2").style.display = "none";
}

let specialSolutionOverlay = document.getElementById("specialSolutionOverlay");
// AI, wenn das Video zu Ende ist, soll es automatisch weitergehen
// Es funktioniert so, dass ein EventListener auf das "ended" Event des Videos hört. Sobald das Video zu Ende ist, wird die Funktion ausgeführt, die den Level-Transition-Bildschirm ausblendet, das erste Level ausblendet und das zweite Level anzeigt. Dadurch wird der Übergang zwischen den Levels nahtlos gestaltet, ohne dass der Spieler manuell eingreifen muss.
transitionVideo.addEventListener("ended", () => {
    levelTransition.style.display = "none";
    correct.currentTime = 0;
    correct.play();
    if (CURRENT_LEVEL_NUMBER === 1) {
        setLevel(2);
    } else if (CURRENT_LEVEL_NUMBER === 2) {
        setLevel(3);
        playDialog(dialoge.level3.dialog2);
    } else if (CURRENT_LEVEL_NUMBER === 3) {
        setLevel(4);
    }
    saveGame();
});