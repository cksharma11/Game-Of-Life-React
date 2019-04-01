import React from "react";
import ReactDOM from "react-dom";

const createGrid = function(size) {
  let grid = new Array(size).fill(undefined);
  return grid.map(cell => new Array(size).fill(0));
};
