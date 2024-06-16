const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let direction = '';
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};
let score = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (keyPressed === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (keyPressed === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (keyPressed === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#3498db' : '#2980b9';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over');
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

const game = setInterval(draw, 100);

document.getElementById('reset-button').addEventListener('click', () => {
    clearInterval(game);
    snake = [];
    snake[0] = { x: 10 * box, y: 10 * box };
    direction = '';
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    game = setInterval(draw, 100);
});
