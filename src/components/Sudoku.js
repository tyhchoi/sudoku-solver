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

  checkRowCol(grid, row, col, val) {
    for (let i = 0; i < LENGTH; i++) {
      if (grid[i][col] === val || grid[row][i] === val) {
        return false;
      }
    }

    return true;
  }

  checkSquare(grid, row, col, val) {
    let rows = [0, 3];
    let cols = [0, 3];
    while (row >= rows[1]) {
      rows[0] += 3;
      rows[1] += 3;
    }

    while (col >= cols[1]) {
      cols[0] += 3;
      cols[1] += 3;
    }

    for (let i = rows[0]; i < rows[1]; i++) {
      for (let j = cols[0]; j < cols[1]; j++) {
        if (grid[i][j] === val) {
          return false;
        }
      }
    }

    return true;
  }

  getNumbers(grid, row, col) {
    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return nums.filter(num => this.checkRowCol(grid, row, col, num) && this.checkSquare(grid, row, col, num));
  }

  solve(grid) {
    for (let i = 0; i < LENGTH; i++) {
      for (let j = 0; j < LENGTH; j++) {
        if (grid[i][j] === '') {
          const nums = this.getNumbers(grid, i, j);
          for (let k = 0; k < nums.length; k++) {
            grid[i][j] = nums[k];
            this.setState(grid);
            if (!this.solve(grid)) {
              grid[i][j] = ''
              this.setState(grid);
            } else {
              break;
            }
          }

          return !(grid[i][j] === '');
        }
      }
    }

    return true;
  }

  render() {
    return (
      <div className="game">
        <div className="game-grid">
          <Grid grid={this.state.grid} />
        </div>
        <button onClick={() => this.solve(this.state.grid)}>Solve</button>
      </div>
    );
  }
}

export default Sudoku;
