import React from 'react';
import Grid from './Grid';
import Solver from './Solver';

class Sudoku extends React.Component {
  constructor() {
    super();
    const grid = Solver.randomGrid();
    const gridStates = Solver.solve(JSON.parse(JSON.stringify(grid)));

    this.state = {
      grid,
      gridStates,
      interval: 10,
      count: 0,
      timer: null
    };
  }

  loop() {
    const initialInterval = this.state.interval;
    let { count } = this.state;
    const timer = setInterval(() => {
      this.setState({grid: this.state.gridStates[count]});
      count++;

      if (initialInterval !== this.state.interval) {
        this.setState({count});
        clearInterval(timer);
        this.loop();
      }

      if (count >= this.state.gridStates.length) {
        clearInterval(timer);
      }
    }, this.state.interval);

    this.setState({timer});
  }

  newRandom() {
    clearInterval(this.state.timer);

    const grid = Solver.randomGrid();
    const gridStates = Solver.solve(JSON.parse(JSON.stringify(grid)));

    this.setState({
      grid,
      gridStates,
      count: 0,
      timer: null
    });
  }

  handleChange(e) {
    this.setState({interval: e.target.value});
  }

  render() {
    return (
      <div className='sudoku'>
        <div className='sudoku-grid'>
          <Grid grid={this.state.grid} />
        </div>
        <button onClick={() => this.loop()}>Solve</button>
        <button onClick={() => this.newRandom()}>Random</button>
        <label htmlFor='speed'>Faster</label>
        <input type='range' id='start' name='speed' min='10' max='110' step='10'
          defaultValue={this.state.interval} onChange={this.handleChange.bind(this)} />
        <label htmlFor='speed'>Slower</label>
      </div>
    );
  }
}

export default Sudoku;
