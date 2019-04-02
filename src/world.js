import React from "react";
import ReactDOM from "react-dom";

class World extends React.Component {
  constructor(props) {
    super(props);
    this.cells = this.createGrid(5);
    this.aliveCells = [];
    this.state = { aliveCells: this.aliveCells };
  }

  createGrid(size) {
    let grid = new Array(size).fill(undefined);
    return grid.map(cell => new Array(size).fill(0));
  }

  render() {
    return this.renderWorld(
      this.evaluateNextGeneration(this.createWorld(this.state.aliveCells, 5))
    );
  }

  renderWorld(board) {
    const renderableWorld = board.map((row,rowIndex) => {
      return <div className="world-row">{row.map((cell,colIndex) => {
          return <div id={rowIndex + "_" + colIndex} key={rowIndex + "_" + colIndex} onClick={this.handleClick.bind(this)} className="dead-cell">{cell}</div>
      })}</div>;
    });
    renderableWorld.push(<button></button>)
    return renderableWorld;
  }

  handleClick(event){
      const row = +event.target.id.split("_")[0];
      const col = +event.target.id.split("_")[1];
      this.setState = { aliveCells: this.aliveCells.push({ row, col }) }
      event.target.className = "alive-cell";
  }

  createWorld(aliveCells, size) {
    let world = this.createGrid(size);
    for (let aliveCell of aliveCells) {
      world[aliveCell.row][aliveCell.col] = 1;
    }
    return world;
  }

  evaluateNextGeneration(grid) {
    let nextGenWorld = this.createGrid(grid.length);
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid.length; col++) {
        let cell = grid[row][col];
        let cellRules = getCellRules(cell);
        let aliveNeighboursCount = countAliveNeighbours(row, col, grid);
        nextGenWorld[row][col] = cellRules[aliveNeighboursCount];
      }
    }
    return nextGenWorld;
  }
}

export default World;

const findNeighbours = function(row, col, grid) {
  let neighbours = new Array();
  neighbours.push({ row, col: col + 1 });
  neighbours.push({ row: row + 1, col: col + 1 });
  neighbours.push({ row: row + 1, col });
  neighbours.push({ row: row + 1, col: col - 1 });
  neighbours.push({ row, col: col - 1 });
  neighbours.push({ row: row - 1, col: col - 1 });
  neighbours.push({ row: row - 1, col });
  neighbours.push({ row: row - 1, col: col + 1 });

  return neighbours.filter(cell => {
    return grid[cell.row] != undefined && grid[cell.row][cell.col] != undefined;
  });
};

const countAliveNeighbours = function(row, col, grid) {
  let neighbours = findNeighbours(row, col, grid);
  return neighbours.reduce((neighboursCount, currentNeighbour) => {
    return neighboursCount + grid[currentNeighbour.row][currentNeighbour.col];
  }, 0);
};

const getCellRules = function(cell) {
  const aliveCellRules = [0, 0, 1, 1, 0, 0, 0, 0, 0];
  const deadCellRules = [0, 0, 0, 1, 0, 0, 0, 0, 0];
  const allCellRules = [deadCellRules, aliveCellRules];
  return allCellRules[cell];
};
