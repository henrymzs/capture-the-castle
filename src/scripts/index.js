const playerChoices = 3;
const startCapturedNodes = 5;
const capturedNodesToWin = 10;

const choices = ['vanguard', 'ranged', 'defense'];

let computerScore = 0;
let playerScore = 0;
let drawScore = 0;
let round = 1;
let nodesCaptured = startCapturedNodes;

const buttons = document.querySelectorAll('.class_selection');
const roundDisplay = document.querySelector('span.round');
const playerImageDisplay = document.querySelector(".player_boll img");
const computerImageDisplay = document.querySelector(".computer_boll img");
const playerPaddingDisplay = document.querySelector(".player_boll");
const computerPaddingDisplay = document.querySelector(".computer_boll");
const playerPointsDisplay = document.querySelector('.player_points');
const battleMsg = document.querySelector(".message_battle");

const closedModalButton = document.querySelector('.play_again_button');
const overlay = document.querySelector('#overlay');
const modal = document.querySelector('#modal');
const modalHeader = document.querySelector('.modal_header');
const modalMsg = document.querySelector('.modal_message');
const drawMsg = document.querySelector(".draws");
const winMsg = document.querySelector(".wins");
const lossesMsg = document.querySelector(".losses");
const resetButton = document.querySelector(".reset_btn");

const resetGame = () => {
    playerPaddingDisplay.setAttribute("style", "background-color: #bbb;");
    computerPaddingDisplay.setAttribute("style", "background-color: #bbb;");

    playerImageDisplay.setAttribute("src", "");
    computerImageDisplay.setAttribute("src", "");
    nodesCaptured = startCapturedNodes;

    const playerDefaultNodes = document.querySelectorAll(".boll_player")
    playerDefaultNodes.forEach((node) => { node.setAttribute("style", "background-color: #1F6FEB"); })

    const computerDefaultNodes = document.querySelectorAll(".boll_computer")
    computerDefaultNodes.forEach((node) => { node.setAttribute("style", "background-color: #eb1f1f"); })

    round = 1;
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    roundDisplay.textContent = 1;

};

function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerChoice, computerChoice) {
    let playerNum = choices.indexOf(playerChoice);
    let computerNum = choices.indexOf(computerChoice);

    if (playerNum == computerNum) {
        drawScore++;
        playerPaddingDisplay.setAttribute("style", "background-color: yellow");
        computerPaddingDisplay.setAttribute("style", "background-color: yellow");
        battleMsg.textContent = 'A batalha resultou em empate!';
    } else if ((playerNum + 1) % playerChoices === computerNum) {
        playerScore++;
        nodesCaptured++;
        const nodeElem = document.querySelector(`#n${nodesCaptured}`)
        playerPaddingDisplay.setAttribute("style", "background-color: green");
        computerPaddingDisplay.setAttribute("style", "background-color: red");
        nodeElem.setAttribute("style", "background-color: blue")
        battleMsg.textContent = 'Você venceu a batalha!';
    } else {
        computerScore++;
        const nodeElem = document.querySelector(`#n${nodesCaptured--}`)
        playerPaddingDisplay.setAttribute("style", "background-color: red");
        computerPaddingDisplay.setAttribute("style", "background-color: green");
        nodeElem.setAttribute("style", "background-color: red")
        battleMsg.textContent = 'Você perdeu a batalha!';
    }

    document.querySelector('.player_points').textContent = `Pontos: ${playerScore}`;
    document.querySelector('.computer_points').textContent = `Pontos: ${computerScore}`;
    
    if (nodesCaptured == capturedNodesToWin || nodesCaptured == 0) {
        if (nodesCaptured == capturedNodesToWin) {
            modalHeader.textContent = "Você venceu!"
            modalMsg.textContent = "Você capturou o castelo inimigo";
        } else {
            modalHeader.textContent = "Você Perdeu!";
            modalMsg.textContent = "O inimigo capturou o seu castelo";
        }
        drawMsg.textContent = drawScore;
        winMsg.textContent = playerScore;
        lossesMsg.textContent = computerScore;
        openModal();
        
    }

}
function playGame(playerSelection) {
    round++;
    roundDisplay.textContent = round;

    const computerSelection = getComputerChoice();

    playerImageDisplay.setAttribute("src", `./src/assets/${playerSelection}.png`);
    computerImageDisplay.setAttribute("src", `./src/assets/${computerSelection}.png`);

    playRound(playerSelection, computerSelection);
}


function main() {

    buttons.forEach((button) => button.addEventListener("click", (e) => {
        const playerSelection = e.currentTarget.dataset.choice;
        playGame(playerSelection);
    }));

    const resetButton = document.querySelector(".reset_btn");
    resetButton.addEventListener("click", resetGame);

    closedModalButton.addEventListener("click",
        () => {
            closeModal();
            resetGame();
        }
    )
}

main();
