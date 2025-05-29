const words = [
  { distorted: "h3ll0", original: "hello" },
  { distorted: "w0r1d", original: "world" },
  { distorted: "g00dbY3", original: "goodbye" },
  { distorted: "fr13nd", original: "friend" },
  { distorted: "d@rk", original: "dark" },
  { distorted: "ch@mb3r", original: "chamber" },
  { distorted: "c0d3", original: "code" },
  { distorted: "t3rm1n@l", original: "terminal" },
    { distorted: "c0mpl3x", original: "complex" },
    { distorted: "s3cur3", original: "secure" },
    { distorted: "d1st0rti0n", original: "distortion" },
    { distorted: "pr0gr@mm3r", original: "programmer" },
    { distorted: "c0ntr0l", original: "control" },
    { distorted: "d3bug", original: "debug" },
    { distorted: "s0ftware", original: "software" },
    { distorted: "h@rdw@re", original: "hardware" }

];

let currentIndex = 0;
let score = 0;
let timeLimit = 3000; // 3 seconds
let timer;
let countdownInterval;

const distortedWord = document.getElementById("distorted-word");
const userInput = document.getElementById("user-input");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const timerBar = document.getElementById("timer-bar");
const timerText = document.getElementById("time-text");

function startGame() {
  score = 0;
  currentIndex = 0;
  gameOverScreen.classList.add("hidden");
  scoreDisplay.textContent = "Score: 0";
  loadNextWord();
}

function loadNextWord() {
  if (currentIndex >= words.length) {
    endGame();
    return;
  }

  const word = words[currentIndex];
  distortedWord.textContent = word.distorted;
  userInput.value = "";
  userInput.focus();

  startTimer();
}

function startTimer() {
  clearTimeout(timer);
  clearInterval(countdownInterval);
  timerBar.style.transition = "none";
  timerBar.style.width = "100%";

  let remaining = timeLimit;
  timerText.textContent = `Time left: ${(remaining / 1000).toFixed(1)}s`;

  setTimeout(() => {
    timerBar.style.transition = `width ${timeLimit}ms linear`;
    timerBar.style.width = "0%";
  }, 10);

  countdownInterval = setInterval(() => {
    remaining -= 100;
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      return;
    }
    timerText.textContent = `Time left: ${(remaining / 1000).toFixed(1)}s`;
  }, 100);

  timer = setTimeout(() => {
   endGame();
  }, timeLimit);
}

userInput.addEventListener("input", () => {
  const userValue = userInput.value.trim().toLowerCase();
  const correctValue = words[currentIndex].original.toLowerCase();

  if (userValue === correctValue) {
    clearTimeout(timer);
    clearInterval(countdownInterval);
    timerBar.style.transition = "none";
    timerBar.style.width = "100%";
    timerText.textContent = "";

    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    currentIndex++;
    setTimeout(loadNextWord, 400); // Short pause for feedback
  }
});

function endGame() {
  distortedWord.textContent = "";
  timerBar.style.width = "0%";
  timerText.textContent = "";
  gameOverScreen.classList.remove("hidden");
  finalScore.textContent = `Your final score: ${score}`;
}

// Optional restart button
function restartGame() {
  scoreDisplay.textContent = "Score: 0";
  startGame();
}

startGame();
