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
  htmlBoard = document.getElementById("gameboard");

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

  const resetBoard = () => {
    Gameboard.board = ["", "", "", "", "", "", "", "", ""];
  };

  const addMove = (event) => {
    let index = event.target.id;

    if (!isOver(index)) {
      let symbol;

      if (turnNumber % 2 === 0) {
        symbol = player2.getSymbol();
      } else {
        symbol = player1.getSymbol();
      }

      Gameboard.board[index] = symbol;
      turnNumber++;

      displayController.render();
      if (isOver(index)) {
        htmlBoard.style.pointerEvents = "none";
      }
    }
  };

  const checkRow = (row) => {
    const b = Gameboard.board;
    let fullRow = true;

    const symbol = b[row * 3];

    b.forEach((element, index) => {
      // checks if element is in current row
      if (Math.floor(index / 3) === row) {
        if (element != symbol) {
          fullRow = false;
        }
      }
    });

    return fullRow;
  };

  const checkColumn = (col) => {
    const b = Gameboard.board;
    let fullCol = true;

    const symbol = b[col];

    b.forEach((element, index) => {
      // checks if element is in current row
      if (index % 3 === col) {
        if (element != symbol) {
          fullCol = false;
        }
      }
    });

    return fullCol;
  };

  const checkDiagonals = (diagonals) => {
    const b = Gameboard.board;

    if (b[4] != "") {
      if (b[0] === b[4] && b[8] === b[4]) {
        return true;
      } else if (b[2] === b[4] && b[6] === b[4]) {
        return true;
      }
    }

    return false;
  };

  const isOver = (index) => {
    let row, col;
    let over = false;
    const b = Gameboard.board;
    row = Math.floor(index / 3);
    col = index % 3;

    if (b[index] === "") {
      over = false;
    } else {
      if (row != 1 && col != 1 && !over) {
        over = checkDiagonals();
      }

      if (!over) {
        over = checkRow(row);
      }

      if (!over) {
        over = checkColumn(col);
      }
    }

    return over;
  };

  return { getBoard, resetBoard, addMove, createPlayers };
})();

const displayController = (() => {
  const init = () => {
    const board = document.getElementById("gameboard");
    board.style.pointerEvents = "all";

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

  const clear = () => {
    const board = document.getElementById("gameboard");
    board.innerHTML = "";
    game.resetBoard();
    init();
  };

  const render = () => {
    const board = game.getBoard();

    board.forEach((element, index) => {
      const gridElement = document.getElementById(index);
      gridElement.firstChild.textContent = board[index];
    });
  };

  return { render, init, clear };
})();

const startGame = (() => {
  game.createPlayers();
  displayController.init();
})();
