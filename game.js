let userClickedPattern = [];
let startedToToggle = false;
let level = 0;

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

// For changing the heading tag after a keypress event occur
$(document).keypress(() => {
  if (!startedToToggle) {
    // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    startedToToggle = true;
  }
});

// For clicking the button and passing that button id to array for further check
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  console.log(`User click array: ${userClickedPattern}`);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// For checking the Answer when the user clicks on the butotn
function checkAnswer(currenLevel) {
  if (gamePattern[currenLevel] === userClickedPattern[currenLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    let wrongAns = new Audio("sounds/wrong.mp3");
    console.log("wrong");
    wrongAns.play();

    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text(`Game Over, Press Any Key to Restart`);

    // Game over so calling this function to restart the game
    startOver();
  }
}

// Random Number Generator Function
function nextSequence() {
  // emptying the array after the user gets the wrong answer
  userClickedPattern = [];

  level++;

  $("#level-title").text(`Level ${level}`);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  console.log(`Game Pattern: ${gamePattern}`);

  // we are using the jQuery to select the randomChosenColour like this
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// For playing sound whatever the button selects
function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

// Used for animation of buttons
function animatePress(currentColour) {
  $(`.${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`.${currentColour}`).removeClass("pressed");
  }, 100);
}

// Reinitialize the value of this to start over the game
function startOver() {
  startedToToggle = false;
  gamePattern = [];
  level = 0;
}
