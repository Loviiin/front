const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variáveis das paletas (paddles)
let paddleHeight = 100;
let paddleWidth = 10;
let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 8;

// Variáveis da bola
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
const ballRadius = 10;

// Controles de movimento das paletas
let paddle1Up = false;
let paddle1Down = false;
let paddle2Up = false;
let paddle2Down = false;

// Event listeners para controles de teclado
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (event.key === 'w') {
        paddle1Up = true;
    } else if (event.key === 's') {
        paddle1Down = true;
    }
    if (event.key === 'ArrowUp') {
        paddle2Up = true;
    } else if (event.key === 'ArrowDown') {
        paddle2Down = true;
    }
}

function keyUpHandler(event) {
    if (event.key === 'w') {
        paddle1Up = false;
    } else if (event.key === 's') {
        paddle1Down = false;
    }
    if (event.key === 'ArrowUp') {
        paddle2Up = false;
    } else if (event.key === 'ArrowDown') {
        paddle2Down = false;
    }
}

// Função para desenhar as paletas
function drawPaddles() {
    ctx.fillStyle = '#3498db';
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
}

// Função para desenhar a bola
function drawBall() {
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
}

// Função para movimentar as paletas
function movePaddles() {
    if (paddle1Up && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    } else if (paddle1Down && paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += paddleSpeed;
    }

    if (paddle2Up && paddle2Y > 0) {
        paddle2Y -= paddleSpeed;
    } else if (paddle2Down && paddle2Y < canvas.height - paddleHeight) {
        paddle2Y += paddleSpeed;
    }
}

// Função para movimentar a bola
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Verificar colisão com as paredes superior e inferior
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Verificar colisão com as paletas
    if (
        ballX - ballRadius < paddleWidth &&
        ballY > paddle1Y &&
        ballY < paddle1Y + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    } else if (
        ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > paddle2Y &&
        ballY < paddle2Y + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Verificar se a bola saiu pela lateral e reiniciar o jogo
    if (ballX + ballRadius > canvas.width) {
        resetGame();
    } else if (ballX - ballRadius < 0) {
        resetGame();
    }
}

// Função para desenhar tudo no canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddles();
    drawBall();
}

// Função principal do jogo
function gameLoop() {
    movePaddles();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

// Iniciar o jogo
function startGame() {
    gameLoop();
}

// Reiniciar o jogo
function resetGame() {
    paddle1Y = (canvas.height - paddleHeight) / 2;
    paddle2Y = (canvas.height - paddleHeight) / 2;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5;
    ballSpeedY = 5;
}

// Event listener para o botão de reiniciar jogo
document.getElementById('reset-button').addEventListener('click', function() {
    resetGame();
});

// Iniciar o jogo pela primeira vez
startGame();
