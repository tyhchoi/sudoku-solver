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
      if (i !== row) {
        if (grid[i][col] === val) {
          return false;
        }
      }

      if (i !== col) {
        if (grid[row][i] === val) {
          return false;
        }
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
        if (i !== row && j !== col) {
          if (grid[i][j] === val) {
            return false;
          }
        }
      }
    }

    return true;
  }

  getEmpty(grid) {
    const empty = []
    for (let i = 0; i < LENGTH; i++) {
      for (let j = 0; j < LENGTH; j++) {
        if (grid[i][j] === '') {
          empty.push([i, j])
        }
      }
    }
    return empty
  }

  solve(grid) {
    const empty = this.getEmpty(grid);

    const saved = [];
    for (let i = 0; i < empty.length; i++) {
      saved.push(1);
    }

    let i = 0;
    while (i < empty.length && i > -1) {
      let set = false
      const [row, col] = empty[i];
      let prev = saved[i];

      for (let j = prev; j < LENGTH + 1; j++) {
        const val = j.toString();
        grid[row][col] = val;
        this.setState({grid});

        if (this.checkSquare(grid, row, col, val) && this.checkRowCol(grid, row, col, val)) {
          set = true
          saved[i] = parseInt(val) + 1;
          i++;
          break;
        }
      }

      if (!set) {
        saved[i] = 1;
        grid[row][col] = ''
        this.setState({grid});
        i--;
      }
    }
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
