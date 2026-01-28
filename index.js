const colourNames = [
  "Red","Green","Blue","Yellow","Purple","Cyan","Magenta","Orange",
  "Pink","Brown","Lime","Olive","Teal","Navy","Maroon","Silver"
];

let winingScore = 5;
let targetcolor = "";
let score = 0;
let timer_in = 120;
let gameinterval, timerinterval;

let setrandomcolor = () => {
  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => {
    const randomIndex = Math.floor(Math.random() * colourNames.length);
    const randomColor = colourNames[randomIndex];
    cell.style.backgroundColor = randomColor;
    cell.setAttribute("data-color", randomColor);
  });
};

let settargetcolor = () => {
  const randomIndex = Math.floor(Math.random() * colourNames.length);
  const target_color = document.querySelector("#targetcolor");
  const targetBox = document.querySelector("#targetColorBox");

  targetcolor = colourNames[randomIndex];
  target_color.textContent = targetcolor;
  targetBox.style.backgroundColor = targetcolor;
};


let formattime = (second) => {
  const minutes = Math.floor(second / 60);
  const secs = second % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

let updatetimer = () => {
  timer_in--;
  document.querySelector("#timer").textContent = formattime(timer_in);
  if (timer_in <= 0) {
    endgame(false);
  }
};

let endgame = (iswin) => {
  clearInterval(gameinterval);
  clearInterval(timerinterval);
  document.getElementById("background").pause();

  const overlay = iswin
    ? document.getElementById("conggrat")
    : document.getElementById("lose");

  overlay.style.display = "flex";

  if (iswin) {
    document.getElementById("win_music").play();
  } else {
    document.getElementById("lose_music").play();
  }
};

let handleclick = (e) => {
  const clickedcolor = e.target.getAttribute("data-color");

  if (clickedcolor === targetcolor) {
    score++;
    document.getElementById("score").textContent = score;

    document.getElementById("corect_music").play();

    if (score === winingScore) {
      endgame(true);
      return;
    }

    setrandomcolor();
    settargetcolor();
  } else {
    document.getElementById("incorect_music").play();
  }
};

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", handleclick);
});

let initalizegame = () => {
  score = 0;
  timer_in = 120;

  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = formattime(timer_in);

  document.getElementById("conggrat").style.display = "none";
  document.getElementById("lose").style.display = "none";

  setrandomcolor();
  settargetcolor();

  const bgm = document.getElementById("background");
  bgm.play();

  clearInterval(gameinterval);
  clearInterval(timerinterval);

  gameinterval = setInterval(setrandomcolor, 500);
  timerinterval = setInterval(updatetimer, 500);
};

// 🚀 start game
//initalizegame();

document.getElementById("restart-win").addEventListener("click", initalizegame);
document.getElementById("restart-lose").addEventListener("click", initalizegame);
document.getElementById("startGameBtn").addEventListener("click", () => {
  document.getElementById("startGameBtn").style.display = "none";
  initalizegame();
});

