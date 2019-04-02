import React from "react";
import ReactDOM from "react-dom";

const createGrid = function(size) {
  let grid = new Array(size).fill(undefined);
  return grid.map(cell => new Array(size).fill(0));
};

const createWorld = function(aliveCells, size) {
  let world = createGrid(size);
  for (let aliveCell of aliveCells) {
    world[aliveCell.row][aliveCell.col] = 1;
  }
  return world;
};
