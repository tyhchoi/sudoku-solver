import React, { Component } from 'react';
import Grid from './Grid';

class Sudoku extends Component {
  state = {
    grid: []
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
