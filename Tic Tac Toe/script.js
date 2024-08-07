let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msg = document.querySelector(".msg");
let para = document.querySelector("#para");
let head = document.querySelector('h1');

let turnO = true;

const resetGame = () => {
    EnableBoxes();
    turnO = true;
    msg.classList.add("hide");
}


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


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O"
            turnO = false;
        }
        else {
            box.innerText = "X"
            turnO = true;
        }
        box.disabled = true;            // second time click nhi hoga

        checkWinner();
    });
});

const EnableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    para.innerText = `YAY! , Winner is ${winner}`;
    msg.classList.remove("hide");
    disableBoxes();
}

const checkWinner = (() => {
    for (pattern of winPatterns) {
        let pos0 = boxes[pattern[0]].innerText;
        let pos1 = boxes[pattern[1]].innerText;
        let pos2 = boxes[pattern[2]].innerText;

        if (pos0 != "" && pos1 != "" && pos2 != "") {
            if (pos0 === pos1 && pos1 === pos2) {
                console.log("WINNER is " + pos0);
                showWinner(pos0);
            }
        }
    }
});

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);

let modeBtn = document.querySelector(".mode-btn");
let mode = "Dark";


modeBtn.addEventListener("click", () => {
    if (mode == "light") {
        mode = 'dark';
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        modeBtn.innerText = "Light Mode";
        boxes.forEach(box => {

            box.classList.add("dark-b");
            box.classList.remove("light-b");
        })

        head.classList.add("dark-h1");
        head.classList.remove("light-h1");
    }
    else {
        mode = "light";
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        modeBtn.innerText = "Dark Mode";
        boxes.forEach(box => {
            
            box.classList.remove("dark-b");
            box.classList.add("light-b");
        })
        
        head.classList.add("light-h1");
        head.classList.remove("dark-h1");


    }
})


