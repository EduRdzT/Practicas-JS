const d = document;

export default function gato() {
  const $boxes = d.querySelectorAll(".box"),
    $text = d.querySelector("#heading"),
    $restartBtn = d.querySelector("#restart");

  const drawBoard = () => {
    $boxes.forEach((box, i) => {
      let styleString = "";
      if (i < 3) {
        styleString += "border-bottom: 3px solid #111;";
      }
      if (i % 3 === 0) {
        styleString += "border-right: 3px solid #111;";
      }
      if (i % 3 === 2) {
        styleString += "border-left: 3px solid #111;";
      }
      if (i > 5) {
        styleString += "border-top: 3px solid #111;";
      }
      box.style = styleString;
      box.addEventListener("click", boxClicked);
    })
  };

  const spaces = [],
    tick_circle = "O",
    tick_x = "X",
    won = [ [0,1,2], [0,3,6], [0,4,8], [8,2,5], [8,6,7], [4,1,7], [4,3,5], [4,2,6] ];
  let currentPlayer = tick_circle,
    wonFlag = false;
  drawBoard();

  function boxClicked(e) {
    const id = e.target.id;
    if(!spaces[id] && !wonFlag) {
      spaces[id] = currentPlayer;
      e.target.textContent = currentPlayer;

      won.forEach(el => {
        if (playerWon(...el)) {
          $text.textContent = `${currentPlayer} has won!`;
          return wonFlag = true;
        }
      })

      if(wonFlag) return;
      if (playerDraw()) return;

      currentPlayer = currentPlayer === tick_circle ? tick_x : tick_circle;
    }
  }
  function playerWon(first, second, third) {
    if (spaces[first] === currentPlayer) {
      if (spaces[second] === currentPlayer && spaces[third] === currentPlayer) {
        $boxes[first].style.color = "red";
        $boxes[second].style.color = "red";
        $boxes[third].style.color = "red";
        return true;
      }
    }
  }
  function playerDraw() {
    let draw = 0;
    spaces.forEach(() => draw++)
    if ( draw === 9 ) {
      $text.textContent = "Draw";
    }
  }

  $restartBtn.addEventListener("click", () => {
    const limit = spaces.length
    for(let i = 0; i < limit; i++) spaces.pop();
    $boxes.forEach(box => {
      box.textContent = "";
      box.style.color = "inherit";
    });
    $text.textContent = "Play";
    wonFlag = false;
  });
}