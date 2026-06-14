/**
 * Checks intersection between two html elements
 * @param {HTMLElement} div1 - Reference to first html element (PLAYER)
 * @param {HTMLElement} div2 - Reference to second html element (ITEM)
 * @param {number} tolerance - Integer to change accuracy of collission (0: default, negative number: detect later, positive number: detect earlier) 
 * @returns {boolean} - true or false depending on collision
 */

function isColliding(div1, div2, tolerance) {

    let d1OffsetTop = div1.offsetTop;
    let d1OffsetLeft = div1.offsetLeft;
    let d1Height = div1.clientHeight;
    let d1Width = div1.clientWidth;
    let d1Top = d1OffsetTop + d1Height
    let d1Left = d1OffsetLeft + d1Width;

    let d2OffsetTop = div2.offsetTop;
    let d2OffsetLeft = div2.offsetLeft;
    let d2Height = div2.clientHeight;
    let d2Width = div2.clientWidth;
    let d2Top = d2OffsetTop + d2Height;
    let d2Left = d2OffsetLeft + d2Width;

    let distanceTop = d2OffsetTop - d1Top;
    let distanceBottom = d1OffsetTop - d2Top;
    let distanceLeft = d2OffsetLeft - d1Left;
    let distanceRight = d1OffsetLeft - d2Left;

    return !(tolerance < distanceTop || tolerance < distanceBottom || tolerance < distanceLeft || tolerance < distanceRight);
};

let player = document.getElementById("player");
let solutionCircle = document.getElementById("solutionCircle");
let solutionBoard = document.getElementById("solutionBoard");
let solutionCircleTwo1 = document.getElementById("solutionCircleTwo1");
let solutionBoard2 = document.getElementById("solutionBoard2");
let solutionCircleTwo2 = document.getElementById("solutionCircleTwo2");
let solutionBoard3 = document.getElementById("solutionBoard3");
let solutionCircleTwoS = document.getElementById("solutionCircleTwoS");
let solutionBoardLvlTwo = document.getElementById("solutionBoardLvlTwo");
let solutionCircleThree = document.getElementById("solutionCircleThree");
let collisionBoxLevel4 = document.getElementById("collisionBoxLevel4");
let level4Triggered = false;

let solutionTriggered = false;

function checkCollision() {
    if (solutionTriggered == false && isColliding(player, solutionCircle, -20)) {

        solutionTriggered = true;
        keyListenerUp({ key: "ArrowLeft" });
        keyListenerUp({ key: "ArrowUp" });
        keyListenerUp({ key: "ArrowRight" });
        keyListenerUp({ key: "ArrowDown" });
        solutionBoard.style.display = "grid";
        playDialog(dialoge.level1.dialog2);

        gsap.set("#solutionUI", {
            scale: 0.9,
            opacity: 0
        });
        gsap.to("#solutionUI", {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });

        solutionTriggered = false;
    }

    if (solutionTriggered == false && isColliding(player, solutionCircleTwo1, -20)) {
        solutionTriggered = true;
        keyListenerUp({ key: "ArrowLeft" });
        keyListenerUp({ key: "ArrowUp" });
        keyListenerUp({ key: "ArrowRight" });
        keyListenerUp({ key: "ArrowDown" });

        solutionBoard2.style.display = "grid";

        gsap.set("#solutionUI", {
            scale: 0.9,
            opacity: 0
        });

        gsap.to("#solutionUI", {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
        solutionTriggered = false;
    }

    if (solutionTriggered == false && isColliding(player, solutionCircleTwo2, -20)) {

        solutionTriggered = true;

        keyListenerUp({ key: "ArrowLeft" });
        keyListenerUp({ key: "ArrowUp" });
        keyListenerUp({ key: "ArrowRight" });
        keyListenerUp({ key: "ArrowDown" });

        solutionBoard3.style.display = "grid";

        gsap.set("#solutionUI", {
            scale: 0.9,
            opacity: 0
        });

        gsap.to("#solutionUI", {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });
        solutionTriggered = false;
    }
    if (solutionTriggered == false && isColliding(player, solutionCircleTwoS, -20)) {
        solutionTriggered = true;
        keyListenerUp({ key: "ArrowLeft" });
        keyListenerUp({ key: "ArrowUp" });
        keyListenerUp({ key: "ArrowRight" });
        keyListenerUp({ key: "ArrowDown" });

        solutionBoardLvlTwo.style.display = "grid";

        gsap.set("#solutionUI", {
            scale: 0.9,
            opacity: 0
        });

        gsap.to("#solutionUI", {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        });

        solutionTriggered = false;
    }

    if (solutionTriggered == false && isColliding(player, solutionCircleThree, -20)) {
        solutionTriggered = true;
        keyListenerUp({ key: "ArrowLeft" });
        keyListenerUp({ key: "ArrowUp" });
        keyListenerUp({ key: "ArrowRight" });
        keyListenerUp({ key: "ArrowDown" });

        specialSolutionOverlay.style.display = "flex";
        solutionTriggered = false;
    }
}

function onSolutionFound() {
    solutionBoard.style.display = "grid";
    solutionTriggered = false;
    playDialog(dialoge.level1.dialog2);
}

let key = document.getElementById("key");
let keyCollected = false;

function detectKeyCollision() {
    if (keyCollected) {
        return;
    }
    let playerRect = PLAYER.box.getBoundingClientRect();
    let keyRect = key.getBoundingClientRect();

    if (playerRect.left < keyRect.right && playerRect.right > keyRect.left && playerRect.top < keyRect.bottom && playerRect.bottom > keyRect.top) {
        keyCollected = true;
        key.style.display = "none";
        inventory.push("KeyObject");
        updateInventory();
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
    }
}

function checkLevel4Collision() {
    if (level4Triggered == false && isColliding(player, collisionBoxLevel4, -20)) {
        level4Triggered = true;
        keyListenerUp({ key: "ArrowLeft" });
        keyListenerUp({ key: "ArrowUp" });
        keyListenerUp({ key: "ArrowRight" });
        keyListenerUp({ key: "ArrowDown" });
        console.log("LEVEL 4 TRIGGER");
        showBlackScreen();
    }
}