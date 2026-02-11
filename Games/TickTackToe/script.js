const rounds = document.querySelector("#total-rounds");
const current_round = document.querySelector("#current-round");
const p_won = document.querySelector("#player-won");
const p_lost = document.querySelector("#player-lost");
const b_won = document.querySelector("#bot-won");
const b_lost = document.querySelector("#bot-lost");
const elements = document.querySelectorAll(".elements");

const gameBox = document.querySelector("#game-box");
const gameMenu = document.querySelector(".game-menu");
const options = document.querySelector("#options");


const NewGameBtn = document.querySelector("#new-game");
const resetBtn = document.querySelector("#reset-game");

let gameOver = false;
let player = null;
let bot = null;
let curr_round = 1;
let total_rounds = 5;
let p_won_total = 0;
let b_won_total = 0;
let b_lost_total = 0;
let p_lost_total = 0;
const win_patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function new_game() {
    elements.forEach((ele) => {
        ele.innerText = ""
    });
    curr_round = 1;
    player = null;
    bot = null;
    p_won_total = 0;
    p_lost_total = 0;
    b_won_total = 0;
    b_lost_total = 0;

    if (gameMenu.classList.contains("hidden")) {
        gameMenu.classList.remove("hidden");
        gameBox.classList.add("hidden");
    }

    rounds.innerText = `Total Rounds: ${total_rounds}`;
    current_round.innerText = `Current Round: ${curr_round}`;
    p_lost.innerText = `You Lost: ${p_lost_total}`;
    p_won.innerText = `You Won: ${p_won_total}`;
    b_lost.innerText = `Computer Lost: ${b_lost_total}`;
    b_won.innerText = `Computer Won: ${b_won_total}`;

};


function reset_game() {
    elements.forEach(ele => ele.innerText = "");
    gameOver = false;
}

function endGame(player, bot) {
    if (check_winner(player)) {
        alert("You Won this round!");
        gameOver = true;
        p_won_total++;
        b_lost_total++;
        p_won.innerText = `You Won: ${p_won_total}`;
        b_lost.innerText = `Computer Lost: ${b_lost_total}`;
        next_round();
        reset_game();
        return;
    }

    else if (check_winner(bot)) {
        alert("You Lost this round!");
        gameOver = true;
        p_lost_total++;
        b_won_total++;
        p_lost.innerText = `You Lost: ${p_lost_total}`;
        b_won.innerText = `Computer Won: ${b_won_total}`;
        next_round();
        reset_game();
        return;
    }

    else if (is_draw()) {
        gameOver = true;
        alert("Draw!");
        next_round();
        reset_game();
        return;
    }

};

function check_winner(symbol) {
    if (!symbol) return;
    return win_patterns.some(pattern => pattern.every(key => elements[key].innerText === symbol));
};

function is_draw() {
    return [...elements].every(cell => cell.innerText !== "");
};

function next_round() {
    curr_round++;
    current_round.innerText = `Current Round: ${curr_round}`;
    if (curr_round > total_rounds) {
        if (p_won_total < b_won_total) {
            alert("Computer Won!");
            new_game();
        }
        else if (p_won_total > b_won_total) {
            alert("You Won!");
            new_game();
        };
    };
    return;
};

rounds.innerText = `Total Rounds: ${total_rounds}`;
current_round.innerText = `Current Round: ${curr_round}`;
p_lost.innerText = `You Lost: ${p_lost_total}`;
p_won.innerText = `You Won: ${p_won_total}`;
b_lost.innerText = `Computer Lost: ${b_lost_total}`;
b_won.innerText = `Computer Won: ${b_won_total}`;

resetBtn.addEventListener("click", reset_game);
NewGameBtn.addEventListener("click", new_game);


options.addEventListener("change", () => {
    if (options.value == "") return;
    player = options.value;
    if (player) {
        if (player == "X") bot = "O";
        else bot = "X";
    }
    gameMenu.classList.add("hidden");
    gameBox.classList.remove("hidden");
    gameOver = false;
});

function displayTics(button) {
    if (gameOver) return;
    if (button.innerText !== "") return;

    button.innerText = player;
    button.classList.add("red");
    endGame(player, bot);
    if (gameOver) return;

    const emptyCells = [...elements].filter(el => el.innerText === "");
    if (emptyCells.length === 0) {
        endGame(player, bot);
        return;
    }

    const randIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randIndex].innerText = bot;
    emptyCells[randIndex].classList.add("blue")
    endGame(player, bot);
}



elements.forEach((ele) => {
    ele.addEventListener("click", () => displayTics(ele));
})


