const alphabet = "qwertyuiopasdfghjklzxcvbnm";
// prettier-ignore
const words = [
  "about", "alert", "argue", "beach", "began", "begin", "black", "bring", "brown", "build", 
  "cause", "check", "class", "clean", "clear", "climb", "close", "count", "court", "cover", 
  "cross", "dance", "doubt", "dream", "drink", "drive", "early", "earth", "eight", "empty", 
  "enemy", "enjoy", "enter", "event", "every", "exact", "exist", "extra", "faith", "false", 
  "fault", "field", "final", "first", "floor", "focus", "force", "frame", "fresh", "front", 
  "fruit", "glass", "grand", "grant", "grass", "great", "green", "group", "guess", "guide", 
  "happy", "heart", "heavy", "horse", "house", "human", "ideal", "image", "index", "input", 
  "issue", "judge", "knife", "large", "laugh", "layer", "learn", "level", "light", "limit", 
  "local", "logic", "loose", "lunch", "major", "march", "match", "metal", "model", "money", 
  "month", "motor", "mount", "mouse", "mouth", "movie", "music", "needs", "never", "night", 
  "noise", "north", "novel", "nurse", "occur", "ocean", "offer", "often", "order", "other", 
  "paper", "party", "peace", "phase", "phone", "photo", "piece", "pilot", "pitch", "place", 
  "plane", "plant", "plate", "point", "pound", "power", "press", "price", "pride", "prime", 
  "print", "prior", "prize", "proof", "proud", "prove", "queen", "quick", "quiet", "quite", 
  "radio", "raise", "range", "rapid", "ratio", "reach", "ready", "refer", "right", "river", 
  "rough", "round", "route", "royal", "rural", "scale", "scene", "scope", "score", "sense", 
  "serve", "seven", "shade", "shake", "shall", "shape", "share", "sharp", "sheet", "shelf", 
  "shell", "shift", "shirt", "shock", "shoot", "short", "sight", "since", "skill", "sleep", 
  "slide", "small", "smile", "smoke", "solid", "solve", "sorry", "sound", "south", "space", 
  "speak", "speed", "spend", "split", "sport", "stack", "staff", "stage", "stand", "start", 
  "state", "steam", "steel", "stick", "still", "stock", "stone", "store", "storm", "story", 
  "strip", "stuck", "study", "stuff", "style", "sugar", "table", "taste", "teach", "teeth", 
  "theme", "there", "thick", "thing", "think", "third", "those", "three", "throw", "tight", 
  "title", "today", "touch", "tough", "tower", "track", "trade", "train", "treat", "truck", 
  "trust", "truth", "uncle", "under", "union", "unity", "until", "upper", "upset", "urban", 
  "usage", "usual", "valid", "value", "video", "virus", "visit", "vital", "voice", "waste", 
  "watch", "water", "wheel", "where", "which", "while", "white", "whole", "whose", "woman", 
  "world", "worry", "worse", "worst", "write", "wrong", "yield", "young", "youth", "zebra"
];
let line = 0;
let count = 0;
let word = "";
let win = false;
let gameStop = false;
let guessedWord = words[Math.trunc(Math.random() * words.length)];
const btnCloseModal = document.querySelector(".modal-close");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const answer = document.querySelector(".answermodal");
const wORl = document.querySelector(".Win_or_Loss");
// Announcement of changes⬆️

// Write a letter
function addLetter(letter) {
  if (count < 5) {
    let letterUp = letter.toUpperCase();
    const writeLetter =
      document.querySelectorAll(".line")[line].children[count];

    writeLetter.textContent = letterUp;
    count++;
    word += letter;
  }
}
// Functionality for enter
const enter = function () {
  const rowTiles = document.querySelectorAll(".line")[line].children;
  const guessArray = word.split("");
  const solutionArray = guessedWord.split("");

  const state = Array(5).fill("grey");

  for (let i = 0; i < 5; i++) {
    if (guessArray[i] === solutionArray[i]) {
      state[i] = "green";
      solutionArray[i] = null;
    }
  }
  for (let i = 0; i < 5; i++) {
    if (state[i] === "green") continue;

    const targetIndex = solutionArray.indexOf(guessArray[i]);
    if (targetIndex !== -1) {
      state[i] = "orange";
      solutionArray[targetIndex] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    rowTiles[i].classList.remove("grey", "orange");
    rowTiles[i].classList.add(state[i]);

    const letter = guessArray[i].toUpperCase();
    const keyButton = document.querySelector(`.${letter}`);
    if (keyButton) {
      if (keyButton.classList.contains("green")) {
        continue;
      } else if (state[i] === "green") {
        keyButton.classList.remove("grey", "orange");
        keyButton.classList.add("green");
      } else if (state[i] === "orange") {
        keyButton.classList.remove("grey");
        keyButton.classList.add("orange");
      } else if (!keyButton.classList.contains("orange")) {
        keyButton.classList.add("grey");
      }
    }
  }

  if (line < 5) line++;
  count = 0;
};
function submitWord() {
  // Functionality win
  if (word === guessedWord) {
    win = true;
    enter();
    gameStop = true;
    openModal();
    return;
  }
  // Functionality loss
  if (word !== guessedWord && line === 5) {
    win = false;
    enter();
    gameStop = true;
    openModal();
    return;
  }
  enter();
  word = "";
}
// Backspace functionality
const backspace = function () {
  if (count > 0) {
    count--;
    const writeLetter =
      document.querySelectorAll(".line")[line].children[count];
    writeLetter.textContent = " ";
    word = word.slice(0, -1);
  }
};

// New game functionality
const newGame = function () {
  line = 0;
  count = 0;
  word = "";
  win = false;
  gameStop = false;
  guessedWord = words[Math.trunc(Math.random() * words.length)];
  // clear
  const allWordElement = document.querySelectorAll(".word");
  for (let i = 0; i < allWordElement.length; i++) {
    allWordElement[i].textContent = "";
    allWordElement[i].classList.remove("grey", "orange", "green");
  }
  const allBtnElement = document.querySelectorAll(".btn");
  for (let i = 0; i < allBtnElement.length; i++) {
    allBtnElement[i].classList.remove("grey", "orange", "green");
  }
  closeModal();
};

// Close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Open modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  answer.textContent = `The answer is ${guessedWord.toUpperCase()}`;
  wORl.textContent = win === false ? "You lose" : "You win";

  modal.addEventListener("click", function (e) {
    const clickElement = e.target;
    const letter = clickElement.textContent;
    let letterDown = letter.toLowerCase();
    if (letterDown === "new game") newGame();
  });
};

// Keyboard
document.addEventListener("keydown", function (e) {
  if (!gameStop) {
    const key = e.key.toLowerCase();
    if (alphabet.includes(key)) {
      addLetter(e.key);
    } else if (e.key === "Backspace") backspace();
    else if (e.key === "Escape") closeModal();
    else if (e.key === "Enter" && count === 5) {
      submitWord();
    }
  }
});

// Keyboard through buttons
const keyboard = document.querySelector(".keyboard");
keyboard.addEventListener("click", function (e) {
  const clickElement = e.target;
  const letter = clickElement.textContent;
  let letterDown = letter.toLowerCase();
  if (!gameStop) {
    if (alphabet.includes(letterDown)) {
      addLetter(letterDown);
    } else if (e.target.closest(".backspace")) backspace();
    else if (letterDown === "enter" && count === 5) {
      submitWord();
    }
  }
  if (letterDown === "new game") newGame();
});
