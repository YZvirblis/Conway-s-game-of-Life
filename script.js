const board = document.getElementById("board");
const form = document.getElementById("form");

let grid;
let numberOfCols;
let numberOfRows;
let quantity;
let startUpdate;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  numberOfCols = parseInt(e.target.gridSize.value);
  numberOfRows = parseInt(e.target.gridSize.value);
  quantity = parseInt(e.target.quantity.value);
  clearInterval(startUpdate);
  setUpGrid();
});

const createMatrix = (numOfCols, numOfRows) => {
  let array = new Array(numOfCols);
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(numOfRows);
  }
  return array;
};

const render = () => {
  board.innerHTML = "";
  const columns = [];
  for (let i = 0; i < numberOfCols; i++) {
    const currentRow = document.createElement("div");
    currentRow.className = "row";
    for (let j = 0; j < numberOfRows; j++) {
      const element = document.createElement("div");
      if (grid[i][j] === 1) {
        element.className = "cell alive";
        currentRow.appendChild(element);
      } else {
        element.className = "cell dead";
        currentRow.appendChild(element);
      }
    }
    columns.push(currentRow);
  }
  for (const column of columns) {
    board.appendChild(column);
  }
};

const checkCell = (grid, x, y) => {
  let sum = 0;
  for (let i = x - 1 !== -1 ? x - 1 : x; i < x + 2; i++) {
    if (i !== numberOfCols) {
      for (let j = y - 1 !== -1 ? y - 1 : y; j < y + 2; j++) {
        if (j !== numberOfCols) {
          sum += grid[i][j];
        }
      }
    }
  }
  sum -= grid[x][y];
  return sum;
};

const updateGrid = () => {
  const newGrid = createMatrix(numberOfCols, numberOfRows);
  for (let i = 0; i < numberOfCols; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      const neighbors = checkCell(grid, i, j);
      if (neighbors === 3 || neighbors === 2) {
        newGrid[i][j] = 1;
      } else {
        newGrid[i][j] = 0;
      }
    }
  }
  grid = newGrid;
  render();
};

const setUpGrid = (e) => {
  grid = createMatrix(numberOfCols, numberOfRows);
  for (let i = 0; i < numberOfCols; i++) {
    for (let j = 0; j < numberOfRows; j++) {
      const random = Math.random() * 11;
      if (random <= quantity) {
        console.log(quantity);
        grid[i][j] = 1;
      } else {
        grid[i][j] = 0;
      }
    }
  }
  render();
  startUpdate = setInterval(() => {
    updateGrid();
  }, 500);
};
