const moves = ["Rock", "Paper", "Scissors"];
let playerScore = 0;
let computerScore = 0;
let highScore = 0;
let gameHistory = [];

const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const highScoreElement = document.getElementById("high-score");
const resultElement = document.getElementById("result");
const historyList = document.getElementById("history-list");
const emptyMessage = document.getElementById("empty");

function getComputerMove() {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

function decideWinner(playerMove, computerMove) {
    if (playerMove === computerMove) return "Tie";

    if ((playerMove === "Rock" && computerMove === "Scissors") ||
        (playerMove === "Paper" && computerMove === "Rock") ||
        (playerMove === "Scissors" && computerMove === "Paper")) {
        return "Win";
    }
    return "Lose";
}

function playGame(playerMove) {
    const computerMove = getComputerMove();
    const outcome = decideWinner(playerMove, computerMove);

    if (outcome === "Win") playerScore++;
    else if (outcome === "Lose") computerScore++;

    if (playerScore > highScore) highScore = playerScore;

    const match = {
        playerMove: playerMove,
        computerMove: computerMove,
        outcome: outcome,
        playerScore: playerScore,
        computerScore: computerScore
    };

    gameHistory.unshift(match); 
    updateScores();
    showResult(match);
    showHistory();
}

function updateScores() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    highScoreElement.textContent = highScore;
}

function showResult(match) {
    resultElement.className = "result " + match.outcome.toLowerCase();

    let heading = "It's a tie!";
    let detail = "Both of you chose " + match.playerMove + ".";

    if (match.outcome === "Win") {
        heading = "You win! 🎉";
        detail = match.playerMove + " beats " + match.computerMove + ".";
    } else if (match.outcome === "Lose") {
        heading = "You lost this round";
        detail = match.computerMove + " beats " + match.playerMove + ".";
    }

    resultElement.innerHTML =
        "<h3>" + heading + "</h3>" +
        "<p>You chose " + match.playerMove + " · Computer chose " + match.computerMove + "</p>" +
        "<p>" + detail + "</p>";
}

function showHistory() {
    historyList.innerHTML = "";
    emptyMessage.style.display = gameHistory.length === 0 ? "block" : "none";

    for (let i = 0; i < gameHistory.length; i++) {
        const match = gameHistory[i];
        const item = document.createElement("li");

        let outcomeClass = "outcome-tie";
        let outcomeText = "Tie";

        if (match.outcome === "Win") {
            outcomeClass = "outcome-win";
            outcomeText = "You won";
        } else if (match.outcome === "Lose") {
            outcomeClass = "outcome-lose";
            outcomeText = "You lost";
        }

        item.innerHTML =
            "<span><strong>You: " + match.playerMove + "</strong><br>" +
            "Computer: " + match.computerMove + "<br>" +
            "Score: " + match.playerScore + "–" + match.computerScore + "</span>" +
            "<span class='" + outcomeClass + "'>" + outcomeText + "</span>";

        historyList.appendChild(item);
    }
}

function clearHistory() {
    gameHistory = [];
    showHistory();
}

function resetScores() {
    playerScore = 0;
    computerScore = 0;
    highScore = 0;
    updateScores();
    resultElement.className = "result";
    resultElement.innerHTML = "<h3>Scores reset</h3><p>Choose a move to start again.</p>";
}

const choiceButtons = document.querySelectorAll(".choice");
for (let i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].addEventListener("click", function () {
        playGame(this.dataset.move);
    });
}

document.getElementById("clear-history").addEventListener("click", clearHistory);
document.getElementById("reset").addEventListener("click", resetScores);