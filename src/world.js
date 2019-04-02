import React from "react";

class World extends React.Component {
  constructor(props) {
    super(props);
    this.cells = this.createGrid(10);
    this.state = { cells: this.cells };
  }

  createGrid(size) {
    let grid = new Array(size).fill(undefined);
    return grid.map(cell => new Array(size).fill(0));
  }

  render() {
    return this.renderWorld(this.state.cells);
  }

  renderWorld(board) {
    const renderableWorld = board.map((row,rowIndex) => {
      return <div className="world-row">{row.map((cell,colIndex) => {
          const cellState = this.state.cells[rowIndex][colIndex] == 0 ? "dead-cell" : "alive-cell";
          return <div id={rowIndex + "_" + colIndex} key={rowIndex + "_" + colIndex} onClick={this.handleClick.bind(this)} className={cellState}>{cell}</div>
      })}</div>;
    });
    renderableWorld.push(
            <div className="evoluation-button">
                <button onClick={this.startEvoluation.bind(this)}>Start Evolution</button>
                <button onClick={this.stopEvoluation.bind(this)}>Stop Evolution</button>
                <button onClick={this.reset.bind(this)}>Reset Evolution</button>
            </div>
        )
    return renderableWorld;
  }

  handleClick(event){
      const row = +event.target.id.split("_")[0];
      const col = +event.target.id.split("_")[1];
      const cells = this.state.cells;
      cells[row][col] = 1;
    
      this.setState({ cells: cells });
      event.target.className = "alive-cell";
  }

  startEvoluation(){
        this.intervalID = setInterval(()=>{
            const nextGenerationWorld = this.evaluateNextGeneration(this.state.cells);
            this.setState({cells:nextGenerationWorld});
        }, 1000)
  }

  stopEvoluation(){
    clearInterval(this.intervalID);
  }

  reset(){
    this.stopEvoluation();
    this.setState({ cells : this.createGrid(10) });
  }

  createWorld(aliveCells, size) {
    let world = this.createGrid(size);
    console.log(aliveCells);
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
