const choices = ["rock", "paper", "scissors"];
let wins = 0;
let losses = 0;
let ties = 0;
let playerChoice;

let rockplyr = document.getElementById("rockplayer");
let rockcpu = document.getElementById("rockcomp");
let paperplyr = document.getElementById("paperplayer");
let papercpu = document.getElementById("papercomp");
let scissorplyr = document.getElementById("scissorplayer");
let scissorcpu = document.getElementById("scissorcomp");

// Add event listeners for each button
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let clickedOption = e.target.id;

    // Hide previous choices
    rockplyr.style.display = "none";
    paperplyr.style.display = "none";
    scissorplyr.style.display = "none";
    rockcpu.style.display = "none";
    papercpu.style.display = "none";
    scissorcpu.style.display = "none";

    // Set player choice and display
    if (clickedOption === "rockbtn") {
      playerChoice = "rock";
      rockplyr.style.display = "block";
    } else if (clickedOption === "paperbtn") {
      playerChoice = "paper";
      paperplyr.style.display = "block";
    } else if (clickedOption === "scissorbtn") {
      playerChoice = "scissors";
      scissorplyr.style.display = "block";
    }

    playGame(playerChoice);
  });
});

function playGame(playerChoice) {
  const compChoice = choices[Math.floor(Math.random() * choices.length)];

  // Display computer's choice
  if (compChoice === "rock") {
    rockcpu.style.display = "block";
  } else if (compChoice === "paper") {
    papercpu.style.display = "block";
  } else if (compChoice === "scissors") {
    scissorcpu.style.display = "block";
  }

  // Determine outcome and update stats
  if (playerChoice === compChoice) {
    ties++;
    document.getElementById("tieresult").textContent = ties;
  } else if (
    (playerChoice === "rock" && compChoice === "scissors") ||
    (playerChoice === "paper" && compChoice === "rock") ||
    (playerChoice === "scissors" && compChoice === "paper")
  ) {
    wins++;
    document.getElementById("winresult").textContent = wins;
  } else {
    losses++;
    document.getElementById("lossresult").textContent = losses;
  }
}
