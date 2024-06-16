const cell = document.querySelectorAll(".celula");
let checkturn = true

const JOGADOR_1= "X";
const JOGADOR_2 = "O";

document.addEventListener("click", (event) => {
    if(event.target.matches(".celula")){
    jogar(event.target.id);
    }
});

function jogar(id){
    const celulas = document.getElementById(id);
    turn = checkturn ? JOGADOR_1 : JOGADOR_2
    celulas.textContent = turn;
    checkturn =! checkturn;
    checkwinner(turn);
}

function checkwinner(turn){
    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push(cell[i].textContent);
    }


    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]            
    ];


    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            alert(`Jogador ${turn} venceu!`);
            resetGame();
            return;
        }
    }

    if (!board.includes("")) {
        alert("Empate!");
        resetGame();
    }
}

function resetGame() {
    for (let i = 0; i < 9; i++) {
        cell[i].textContent = "";
    }
    checkturn = true;
}
