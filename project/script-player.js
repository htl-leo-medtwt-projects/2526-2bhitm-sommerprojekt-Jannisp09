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
    spriteImgNumber: 0, // current animation frame of sprite image
    spriteDirection: 1,
    coinCount: 0
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
    // save original position
    let originalX = parseFloat(PLAYER.box.style.left);
    let originalY = parseFloat(PLAYER.box.style.top);

    // calculate new position
    PLAYER.box.style.left = (originalX + dx) + 'px';
    PLAYER.box.style.top = (originalY + dy) + 'px';


    // update sprite direction if needed
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

