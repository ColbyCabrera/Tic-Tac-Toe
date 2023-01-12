const playerFactory = (sym) => {

  let symbol;

  const setSymbol = (character) => {
    symbol = character;
  };

  const getSymbol = () => {
    return symbol;
  };

  setSymbol(sym);

  return { setSymbol, getSymbol };
};

const game = (() => {
  let turnNumber = 1;
  let player1, player2;

  const Gameboard = {
    board: ["", "", "", "", "", "", "", "", ""],
  };

  const createPlayers = () => {
    player1 = playerFactory("X");
    player2 = playerFactory("O");
  };

  const getBoard = () => {
    return Gameboard.board;
  };

  const addMove = (event) => {
    let symbol;

    if (turnNumber % 2 === 0) {
      symbol = player1.getSymbol();
    } else {
      symbol = player2.getSymbol();
    }

    console.log(symbol);

    index = event.target.id;
    Gameboard.board[index] = symbol;
    turnNumber++;

    displayController.render();
  };

  return { getBoard, addMove, createPlayers };
})();

const displayController = (() => {
  const init = () => {
    const board = document.getElementById("gameboard");

    for (i = 0; i < 9; i++) {
      let row, col;
      row = Math.floor(i / 3);
      col = i % 3;
      const gridElement = document.createElement("div");
      const elementText = document.createElement("p");
      gridElement.classList.add("grid-element");
      gridElement.id = i;
      gridElement.classList.add(col + "x");
      gridElement.classList.add(row + "y");
      board.appendChild(gridElement);
      gridElement.appendChild(elementText);
      gridElement.addEventListener("click", game.addMove);
    }
  };

  const render = () => {
    const board = game.getBoard();

    board.forEach((element, index) => {
      const gridElement = document.getElementById(index);
      gridElement.firstChild.textContent = board[index];
    });
  };

  init();

  return { render };
})();

const startGame = (() => {
  game.createPlayers();
})();