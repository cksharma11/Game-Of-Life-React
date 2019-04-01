import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const createGrid = function(size) {
  let grid = new Array(size).fill(undefined);
  return grid.map(cell => new Array(size).fill(0));
};

const CreateWorld = function(props) {
  let world = createGrid(props.size);
  console.log(world);

  for (let aliveCell of props.aliveCells) {
    world[aliveCell.row][aliveCell.col] = 1;
  }
  return world;
};

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

ReactDOM.render(
  <CreateWorld
    aliveCells={[{ row: 1, col: 1 }, { row: 0, col: 1 }]}
    size={5}
  />,
  document.getElementById("root")
);
