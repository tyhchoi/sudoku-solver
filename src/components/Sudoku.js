import React, { Component } from 'react';
import Grid from './Grid';
import file from '../files/sudoku.json'

const LENGTH = 9;
const NUMVALS = 65500;

class Sudoku extends Component {
  state = {
    grid: this.randomGrid()
  }

  randomGrid() {
    const random = Math.floor(Math.random() * NUMVALS);
    const data = file.data[random];
    const grid = [];

    for (let i = 0; i < LENGTH; i++) {
      const row = [];
      for (let j = 0; j < LENGTH; j++) {
        const val = data[j + LENGTH * i];
        if (val === '0') {
          row.push('');
        } else {
          row.push(val);
        }
      }
      grid.push(row);
    }

    return grid;
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Grid grid={this.state.grid} />
        </div>
      </div>
    );
  }
}

export default Sudoku;
