import React, { Component } from 'react';
import Grid from './Grid';
import file from '../files/sudoku.json'

const LENGTH = 9;
const NUMVALS = 65500;

class Sudoku extends Component {
  state = {
    grid: this.randomGrid(),
    interval: 10
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
    const empty = [];
    for (let i = 0; i < LENGTH; i++) {
      for (let j = 0; j < LENGTH; j++) {
        if (grid[i][j] === '') {
          empty.push([i, j]);
        }
      }
    }
    return empty;
  }

  solve(grid, states) {
    const length = grid.length;
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

      for (let j = prev; j < length + 1; j++) {
        const val = j.toString();
        grid[row][col] = val;
        states.push(JSON.parse(JSON.stringify(grid)));

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
        states.push(JSON.parse(JSON.stringify(grid)));
        i--;
      }
    }
  }

  steps() {
    const states = [];
    this.solve(this.state.grid, states);

    for (let i = 0; i < states.length; i++) {
      setTimeout(() => { this.setState({grid: states[i]})}, (i + 1) * this.state.interval);
    }
  }

  handleChange(e) {
    this.setState({interval: e.target.value})
  }

  render() {
    return (
      <div className='sudoku'>
        <div className='sudoku-grid'>
          <Grid grid={this.state.grid} />
        </div>
        <button onClick={() => this.steps()}>Solve</button>
        <button onClick={() => this.setState({grid: this.randomGrid()})}>Random</button>
        <label htmlFor='speed'>Faster</label>
        <input type='range' id='start' name='speed' min='0' max='100' step='10'
          defaultValue={this.state.interval} onChange={this.handleChange.bind(this)} />
        <label htmlFor='speed'>Slower</label>
      </div>
    );
  }
}

export default Sudoku;
