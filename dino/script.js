const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const restartButton = document.getElementById('restartButton');
let isJumping = false;
let isGameOver = false;

function jump() {
    if (isJumping) return;
    isJumping = true;
    let upInterval = setInterval(() => {
        if (dino.offsetTop <= 100) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (dino.offsetTop >= 150) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    dino.style.top = dino.offsetTop + 5 + 'px';
                }
            }, 20);
        } else {
            dino.style.top = dino.offsetTop - 5 + 'px';
        }
    }, 20);
}

function checkCollision() {
    if (cactus.offsetLeft <= 100 && cactus.offsetLeft >= 50 && dino.offsetTop >= 150) {
        clearInterval(cactusMovement);
        isGameOver = true;
        cactus.classList.add('hidden');
        restartButton.style.display = 'block';
        alert('Game Over');
    }
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32 && !isGameOver) {
        jump();
    }
});

const cactusMovement = setInterval(() => {
    if (!isGameOver) {
        cactus.style.left = cactus.offsetLeft - 10 + 'px';
        if (cactus.offsetLeft <= 0) {
            cactus.style.left = '600px';
        }
        checkCollision();
    }
}, 50);

restartButton.addEventListener('click', () => {
    isGameOver = false;
    dino.style.top = '150px';
    cactus.style.left = '600px';
    cactus.classList.remove('hidden');
    restartButton.style.display = 'none';
});
