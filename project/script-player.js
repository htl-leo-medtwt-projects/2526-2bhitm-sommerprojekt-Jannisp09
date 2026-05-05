/***********************************
 * SCRIPT REFERENCES
 ***********************************/
/// <reference path="script_keyevents.js" />



/***********************************
 * PLAYER
 ***********************************/
let PLAYER = {
    box: document.getElementById('player'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0,
    spriteDirection: 1
}

PLAYER.box.style.left = "60px";
PLAYER.box.style.top = "60px";


/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: look left || 1: look right)
 */
function movePlayer(dx, dy, dr) {
    let originalX = parseFloat(PLAYER.box.style.left);
    let originalY = parseFloat(PLAYER.box.style.top);

    let surfaceWidth = GAME_SCREEN.surface.clientWidth;
    let surfaceHeight = GAME_SCREEN.surface.offsetHeight; 
    let playerWidth = PLAYER.box.clientWidth;
    let playerHeight = PLAYER.box.offsetHeight;

    let newX = originalX + dx;
    let newY = originalY + dy;

    if (newX < 0) {
        newX = 0;
    }
    if (newX > surfaceWidth - playerWidth) {
        newX = surfaceWidth - playerWidth;
    }
    if (newY < 0) { 
        newY = 0;
    }
   let bottomLimitOffset = 25;

    if (newY > surfaceHeight - playerHeight + bottomLimitOffset) {
        newY = surfaceHeight - playerHeight + bottomLimitOffset;
    }


    PLAYER.box.style.left = newX + 'px';
    PLAYER.box.style.top = newY + 'px';

    if (dr != 0 && dr != PLAYER.spriteDirection) {
        PLAYER.spriteDirection = dr;
        PLAYER.box.style.transform = `scaleX(${dr})`;
    }
}



/***********************************
 * ANIMATE PLAYER
 * **********************************/
let animationCooldown = 0;

function animatePlayer() {
    if (animationCooldown > 0) {
        animationCooldown--;
        return;
    }
    animationCooldown = 5;
    let frameWidth = 61;

    if (PLAYER.spriteImgNumber < 5) {
        PLAYER.spriteImgNumber++;
        PLAYER.spriteImg.style.left = -(PLAYER.spriteImgNumber * frameWidth) + "px";
    } else {
        PLAYER.spriteImgNumber = 0;
        PLAYER.spriteImg.style.left = "0px";
    }
}

