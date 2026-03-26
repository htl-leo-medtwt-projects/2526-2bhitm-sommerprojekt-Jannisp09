let startScreen = document.getElementById("startScreen");
let settingScreen = document.getElementById("settingsScreen");
startScreen.style.display = "grid";

function startDisplay () {
    startScreen.style.display = "none";
    settingScreen.style.display = "none";
}

function settings () {
    startDisplay();
    settingScreen.style.display = "block";
}