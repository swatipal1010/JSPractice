let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //playerX, player0
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to reset the game
const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBtns();
    msgContainer.classList.add("hide");
};

// Setting up click events for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            box.classList.add("turn0color");
            turn0 = false;
        } else {
            box.innerText = "X";
            box.classList.add("turnXcolor");
            turn0 = true;
        }
        count++;
        box.disabled = true;
        checkWinner();
    });
});

// Function to disable buttons
const disableBtns = () => {
    boxes.forEach((box) => (box.disabled = true));
};

// Function to enable buttons
const enableBtns = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Function to display winner message
const showWinner = (winner) => {
    if (winner === "Draw") {
        msg.innerText = "It's a Draw!";
    } else {
        msg.innerText = `Congratulations, Winner is ${winner}`;
    }
    msgContainer.classList.remove("hide");
    disableBtns();
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }

    // Check for a draw if all boxes are filled
    if (count === 9) {
        showWinner("Draw");
    }
};

// Adding event listeners for reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
