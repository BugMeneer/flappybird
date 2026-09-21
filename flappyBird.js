"use strict";

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// some variables
var gap = 85;
var constant;
var bX = 10; // birdX
var bY = 70; // birdY
var gravity = 1.5;
var score = 0;

// audio files
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down
document.addEventListener("keydown", moveUp);

function moveUp() {
  bY -= 25;
  console.log("kepanggilmoveupteriak");
  fly.play();
}

// pipe coordinates
var pipe = [];

pipe[0] = {
  x: cvs.width,

  y: 0,
};
// console.log(bird.height);
// draw images

console.log(document.getElementById("playgame"));
// draw();

let context = new (window.AudioContext || window.webkitAudioContext)();

// document.addEventListener();
let now = context.currentTime;
function disconnectContext(oscillator) {
  console.log("disconnect");
  oscillator.disconnect(context.destination);
  oscillator.stop();
}

const pad = document.querySelectorAll(".pad");

for (let i = 0; i < pad.length; i++) {
  pad[i].addEventListener("click", function (elem) {});
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const colors = [
  "aqua",
  "azure",
  "beige",
  "bisque",
  "black",
  "blue",
  "brown",
  "chocolate",
  "coral",
  // …
];
const recognition = new SpeechRecognition();

console.log(recognition);

recognition.continuous = false;
recognition.lang = "id-ID";
recognition.interimResults = true;
recognition.maxAlternatives = 1;

// const startBtn = document.querySelector("button");

// hints.innerHTML = `Press the button then say a color to change the background color of the app. Try ${colorHTML}.`;

// startBtn.onclick = () => {

// };

recognition.onresult = (event) => {
  moveUp();
};

recognition.onstart = () => {
  console.log("ga ada suara.");
};

recognition.onaudiostart = () => {
  // moveUp();

  console.log("onaudiostart.");
};

recognition.onaudioend = () => {
  // moveUp();

  console.log("onaudiostart.");
};

recognition.onspeechstart = () => {
  // moveUp();

  console.log("onspeechstart.");
};

recognition.onspeechend = () => {
  console.log("Ready to stop command.");
  recognition.stop();
  console.log("TERIAK.");
  //   setTimeout(recognition.start(), 2000);

  // recognition.start();
};

recognition.onend = function () {
  moveUp();
  console.log("end");
  recognition.start();
  console.log("Ready to receive a command.");
};

recognition.onnomatch = (event) => {
  diagnostic.textContent = "I didn't recognize that color.";
};

recognition.onerror = (event) => {
  diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
};

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    // console.log(bird.height);
    constant = pipeNorth.height + gap;

    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    // detect collision
    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      // console.log(bY + bird.height);
      // console.log(cvs.height - fg.height);
      // console.log(bY + bird.height >= cvs.height - fg.height);
      // console.log("tembus");
      // ini harusnya stop. muncul button try again
      // window.location.reload();
      history.go(0);
      // Source - https://stackoverflow.com/a/18967757
      // Posted by Wellington Zanelli, modified by community. See post 'Timeline' for change history
      // Retrieved 2026-09-21, License - CC BY-SA 3.0

      window.location.href = window.location.href;
    }

    // lewatin
    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, bX, bY);

  bY += gravity;
  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}
