const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20;
canvas.width = canvas.height = gridSize * tileCount;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let velocity = { x: 0, y: 0 };
let score = 0;

function drawGame() {
    updateSnakePosition();
    checkCollision();
    drawBoard();
    drawSnake();
    drawFood();
    setTimeout(drawGame, 100); // Refresh the game 10 times per second
}

function updateSnakePosition() {
    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };
    snake.unshift(head);

    // Remove the last part of the snake unless food was eaten
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    // Check wall collision
    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) {
        resetGame();
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            resetGame();
        }
    }
}

function drawBoard() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    velocity = { x: 0, y: 0 };
    score = 0;
    placeFood();
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (velocity.y === 0) {
                velocity = { x: 0, y: -1 };
            }
            break;
        case "ArrowDown":
            if (velocity.y === 0) {
                velocity = { x: 0, y: 1 };
            }
            break;
        case "ArrowLeft":
            if (velocity.x === 0) {
                velocity = { x: -1, y: 0 };
            }
            break;
        case "ArrowRight":
            if (velocity.x === 0) {
                velocity = { x: 1, y: 0 };
            }
            break;
    }
});

drawGame();
