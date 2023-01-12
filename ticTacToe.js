const game = (() => {
  const Gameboard = {
    board: ["X", "O", "X", "O", "X", "O", "X", "O", "X"]
  };

  const getBoard = () => {
    return Gameboard.board;
  };

  return { getBoard };
})();

const playerFactory = (playerNumber) => {
  let symbol;

  const setSymbol = (character) => {
    symbol = character;
  };

  const move = (symbol) => {};

  return { setSymbol, move };
};

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


displayController.render();