let Score = JSON.parse(localStorage.getItem("storage_score")) || {
  wins: 0,
  lose: 0,
  ties: 0,
};

if (window.onmousedown) {
  console.log(window.onmousedown);
}

update_score(Score);

function game_logic(user_choice) {
  if (user_choice === "reset") {
    reset_logic();
  } else {
    let computer_choice = "";
    const random = Math.random();
    if (random >= 0 && random < 1 / 3) {
      computer_choice = "rock";
    } else if (random >= 1 / 3 && random < 2 / 3) {
      computer_choice = "paper";
    } else if (random >= 2 / 3 && random < 1) {
      computer_choice = "scissors";
    }

    match_choice(user_choice, computer_choice);
  }
}

function match_choice(user_choice, computer_choice) {
  let result = "";
  if (user_choice == computer_choice) {
    result = "Tie ; )";
    Score.ties += 1;
  } else if (
    (user_choice == "rock" && computer_choice == "scissors") ||
    (user_choice == "paper" && computer_choice == "rock") ||
    (user_choice == "scissors" && computer_choice == "paper")
  ) {
    result = "You Won : )";
    Score.wins += 1;
  } else {
    result = "You Lose : (";
    Score.lose += 1;
  }
  document.querySelector(".result").innerText = `${result}`;
  document.querySelector(".user_choice").src = `images/${user_choice}.png`;
  document.querySelector(
    ".computer_choice"
  ).src = `images/${computer_choice}.png`;
  update_score(Score);

  localStorage.setItem("storage_score", JSON.stringify(Score));
}

function reset_logic() {
  Score.wins = 0;
  Score.lose = 0;
  Score.ties = 0;
  console.log(update_score(Score));
  localStorage.removeItem("storage_score");
  document.querySelector(".result").innerText = `Game Reset. Play again!`;
}

function update_score(Score) {
  let score = document.querySelector(".Score");
  score.innerText = `Wins:${Score.wins} Loses:${Score.lose} Ties:${Score.ties}`;
}
