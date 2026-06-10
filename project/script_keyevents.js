
/***********************************
 * EVENT EVENTS
 ***********************************/
let KEY_EVENTS = {
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false
}

let CONTROL_SETTINGS = {
    arrowKeys: true,
    wasd: false
};

if (localStorage.getItem("controlSettings")) {
    CONTROL_SETTINGS = JSON.parse(
        localStorage.getItem("controlSettings")
    );
}

document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

function keyListenerDown(e) {
    if (CONTROL_SETTINGS.arrowKeys) {

        if (e.key === "ArrowLeft")
            KEY_EVENTS.leftArrow = true;

        if (e.key === "ArrowUp")
            KEY_EVENTS.upArrow = true;

        if (e.key === "ArrowRight")
            KEY_EVENTS.rightArrow = true;

        if (e.key === "ArrowDown")
            KEY_EVENTS.downArrow = true;
    }

    if (CONTROL_SETTINGS.wasd) {
        if (e.key.toLowerCase() === "a")
            KEY_EVENTS.leftArrow = true;

        if (e.key.toLowerCase() === "w")
            KEY_EVENTS.upArrow = true;

        if (e.key.toLowerCase() === "d")
            KEY_EVENTS.rightArrow = true;

        if (e.key.toLowerCase() === "s")
            KEY_EVENTS.downArrow = true;
    }
}
function keyListenerUp(e) {
    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a")
        KEY_EVENTS.leftArrow = false;

    if (e.key === "ArrowUp" || e.key.toLowerCase() === "w")
        KEY_EVENTS.upArrow = false;

    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
        KEY_EVENTS.rightArrow = false;

    if (e.key === "ArrowDown" || e.key.toLowerCase() === "s")
        KEY_EVENTS.downArrow = false;
}

