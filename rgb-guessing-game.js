let numberOfColors = 9;
let colorsArray = [];
let pickedColor;
const squares = document.querySelectorAll(".square");
const pickedColorDisplay = document.querySelector(".pickedColorDisplay");
const resetButton = document.querySelector(".reset");
const modeButtons = document.querySelectorAll(".mode");
const feedbackDisplay = document.querySelector(".feedback");
const h1 = document.querySelector("h1");

function generateAColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const randomColor = `rgb(${red}, ${green}, ${blue})`;
  return randomColor;
}

function generateRandomColors(number) {
  const items = [];
  for (let i = 1; i <= number; i += 1) {
    items.push(generateAColor());
  }
  return items;
}

function pickColor() {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
}
function resetGame() {
  feedbackDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  colorsArray = generateRandomColors(numberOfColors);
  pickedColor = pickColor();
  pickedColorDisplay.textContent = pickedColor;
  h1.style.backgroundColor = "#3275ac";
  for (let i = 0; i < squares.length; i += 1) {
    if (colorsArray[i]) {
      squares[i].style.backgroundColor = colorsArray[i];
      squares[i].style.display = "block";
    } else {
      squares[i].style.display = "none";
    }
  }
}

function resetModeButtons() {
  for (let j = 0; j < modeButtons.length; j += 1) {
    modeButtons[j].classList.remove("selected");
  }
  this.classList.add("selected");
  if (this.textContent === "Easy") {
    numberOfColors = 6;
  } else {
    numberOfColors = 9;
  }
  resetGame();
}

function changeColors(color) {
  for (let i = 0; i < squares.length; i += 1) {
    if (squares[i].style.backgroundColor !== color) {
      squares[i].style.backgroundColor = color;
    }
  }
}

function init() {
  for (let i = 0; i < modeButtons.length; i += 1) {
    modeButtons[i].addEventListener("click", resetModeButtons);
  }
  for (let i = 0; i < squares.length; i += 1) {
    squares[i].addEventListener("click", () => {
      const clickedSquareColor = squares[i].style.backgroundColor;
      if (clickedSquareColor === pickedColor) {
        feedbackDisplay.textContent = "Correct";
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
        resetButton.textContent = "Play Again";
      } else {
        squares[i].style.backgroundColor = "#232323";
        feedbackDisplay.textContent = "Try again";
      }
    });
  }
  resetGame();
}

resetButton.addEventListener("click", resetGame);
init();
