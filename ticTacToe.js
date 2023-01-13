const playerFactory = (sym) => {
  let symbol;
  let name;

  const setSymbol = (character) => {
    symbol = character;
  };

  const getSymbol = () => {
    return symbol;
  };

  const setName = (n) => {
    name = n;
  };

  const getName = () => {
    return name;
  };

  setSymbol(sym);

  return { setSymbol, getSymbol, setName, getName };
};

const game = (() => {
  let turnNumber = 1;
  let player1, player2;
  htmlBoard = document.getElementById("gameboard");

  const Gameboard = {
    board: ["", "", "", "", "", "", "", "", ""],
  };

  const createPlayers = () => {
    let name;

    player1 = playerFactory("X");
    player1.setName("Player 1");

    player2 = playerFactory("O");
    player2.setName("Player 2");
  };

  const getPlayerName = (player) => {
    if (player === 0) {
      return player1.getName();
    } else {
      return player2.getName();
    }
  };

  const setPlayerNames = () => {
    const name1 = document.getElementById("player1");
    const name2 = document.getElementById("player2");

    player1.setName(name1.value);

    player2.setName(name2.value);

    name1.value = " ";
    name2.value = " ";
  };

  const getBoard = () => {
    return Gameboard.board;
  };

  const resetBoard = () => {
    Gameboard.board = ["", "", "", "", "", "", "", "", ""];
    turnNumber = 1;
    displayController.clear();
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
        displayController.declareWinner(getPlayerName(turnNumber % 2));
      } else if (turnNumber === 10) {
        displayController.declareWinner("Nobody");
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

  return {
    getBoard,
    resetBoard,
    addMove,
    createPlayers,
    getPlayerName,
    setPlayerNames,
  };
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
    const container = document.getElementById("game-container");
    const winnerText = document.getElementById("winner-text");
    const board = document.getElementById("gameboard");
    board.innerHTML = "";
    container.removeChild(winnerText);
    init();
  };

  const declareWinner = (winner) => {
    const container = document.getElementById("game-container");
    const winnerText = document.createElement("h2");
    winnerText.textContent = winner + " wins!";
    winnerText.id = "winner-text";
    container.appendChild(winnerText);
  };

  const render = () => {
    const board = game.getBoard();

    board.forEach((element, index) => {
      const gridElement = document.getElementById(index);
      gridElement.firstChild.textContent = board[index];
    });
  };

  return { render, init, clear, declareWinner };
})();

const startGame = (() => {
  const replayButton = document.getElementById("replay");
  const nameSubmit = document.getElementById("name-submit");
  nameSubmit.addEventListener("click", game.setPlayerNames);
  replayButton.addEventListener("click", game.resetBoard);
  game.createPlayers();
  displayController.init();
})();
