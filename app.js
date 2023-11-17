const canvas = document.getElementById('gc');
const ctx = canvas.getContext('2d');

//snake part
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//vars
var tileCount = 20;
var tileBlock = canvas.width / tileCount;
var tileSize = tileBlock - 1

var speed = 8;
var inputsXSpeed = 0;
var inputsYSpeed = 0;
var xSpeed = 0;
var ySpeed = 0;
var previousXSpeed = 0;
var previousYSpeed = 0;

var headX = Math.floor(Math.random() * tileCount);
var headY = Math.floor(Math.random() * tileCount);
var appleX = Math.floor(Math.random() * tileCount);
var appleY = Math.floor(Math.random() * tileCount);
var tailLength = 0;

var score = 0;

var header = document.querySelector("#score");

const snakeParts = [];

//main game loop - adapted from CodingWithAdam: https://github.com/CodingWith-Adam/snake/blob/main/index.js
function gameLoop() {
    xSpeed = inputsXSpeed;
    ySpeed = inputsYSpeed;

    if (previousXSpeed === 1 && xSpeed === -1) {
        xSpeed = previousXSpeed;
    }

    if (previousXSpeed === -1 && xSpeed === 1) {
        xSpeed = previousXSpeed;
    }

    if (previousYSpeed === 1 && ySpeed === -1) {
        ySpeed = previousYSpeed;
    }

    if (previousYSpeed === -1 && ySpeed === 1) {
        ySpeed = previousYSpeed;
    }

    previousXSpeed = xSpeed;
    previousYSpeed = ySpeed;

    changeSnakePosition();

    var result = checkGameOver();
    if (result) {
        document.body.removeEventListener('keydown', keyDown);
        return;
    }

    resetScreen();

    checkAppleEat();
    drawApple();
    drawSnake();
    drawScore();

    if (score > 9) {
        speed = 10;
    }

    if (score > 14) {
        speed = 13;
    }

    if (score > 19) {
        speed = 16
    }

    if (score > 29) {
        speed = 22
    }

    if (score > 39) {
        speed = 28
    }

    if (score > 49) {
        speed = 35
    }
    setTimeout(gameLoop, 1000 / speed);

}

//game over - adapted from CodingWithAdam: https://github.com/CodingWith-Adam/snake/blob/main/index.js
function checkGameOver() {
    var gameOver = false;

    if (ySpeed === 0 && xSpeed === 0) {
        return false;
    }

    //walls
    if (headX < 0 || headX === tileCount) {
        gameOver = true;
    }

    else if (headY < 0 || headY === tileCount) {
        gameOver = true;
    }

    //run into self
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        alert("Game Over! Score: " + score)
    }

    return gameOver;
}

//draw snake - adapted from CodingWithAdam: https://github.com/CodingWith-Adam/snake/blob/main/index.js
function drawSnake() {
    ctx.fillStyle = 'aqua';
    for (var i = 0; i < snakeParts.length; i++) {
        var part = snakeParts[i];
        ctx.fillRect(part.x * tileBlock, part.y * tileBlock, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY))
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = 'purple';
    ctx.fillRect(headX * tileBlock, headY * tileBlock, tileSize, tileSize);

}

//key presses
document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    console.log(inputsXSpeed, inputsYSpeed);
    //up
    if (event.keyCode == 38 || event.keyCode == 87) {
        inputsYSpeed = -1;
        inputsXSpeed = 0;
    }

    //down
    if (event.keyCode == 40 || event.keyCode == 83) {
        inputsYSpeed = 1;
        inputsXSpeed = 0;
    }

    //left
    if (event.keyCode == 37 || event.keyCode == 65) {
        inputsYSpeed = 0;
        inputsXSpeed = -1;
    }

    //right
    if (event.keyCode == 39 || event.keyCode == 68) {
        inputsYSpeed = 0;
        inputsXSpeed = 1;
    }
}

//reset screen
function resetScreen() {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//draw apple
function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileBlock, appleY * tileBlock, tileSize, tileSize);
}

//draw score
function drawScore() {
    header.innerHTML = "Score: " + score;
}

//move snake
function changeSnakePosition() {
    headX = headX + xSpeed;
    headY = headY + ySpeed;
}

//check if apple eaten
function checkAppleEat() {
    if (appleX === headX && appleY === headY) {
        generateApplePosition();
        score++;
        tailLength++;
    }
}

//new apple position
function generateApplePosition() {
    let newAppleX = Math.floor(Math.random() * tileCount);
    let newAppleY = Math.floor(Math.random() * tileCount);

    const isAppleCollidingWithSnakePart = snakeParts.some(
        (part) => part.x === newAppleX || part.y === newAppleY
    );

    if (headX == newAppleX && headY == newAppleY) {
        generateApplePosition();
    } else if (isAppleCollidingWithSnakePart) {
        generateApplePosition();
    } else {
        appleX = newAppleX;
        appleY = newAppleY;
    }
}


gameLoop();