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
      timer: null,
      disabled: false,
      runningLoop: false
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

      if (!this.state.runningLoop) {
        this.setState({count});
        clearInterval(timer);
      }

      if (count >= this.state.gridStates.length) {
        this.setState({disabled: true})
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
      timer: null,
      disabled: false,
      runningLoop: false
    });
  }

  handleChange(e) {
    this.setState({interval: e.target.value});
  }

  render() {
    return (
      <div>
        <h1 className='title'>DFS Visualizer using Sudoku</h1>
        <div className='sudoku'>
          <div className='grid'>
            <Grid grid={this.state.grid} />
          </div>
          <div className='controls'>
            <button disabled={this.state.disabled}
              onClick={() => {
                this.setState(prevState => ({
                  runningLoop: !prevState.runningLoop
                }));
                if (!this.state.runningLoop) {
                  this.loop();
                }
              }}>
              {this.state.runningLoop ? 'Stop' : 'Start'}
            </button>
            <button onClick={() => this.newRandom()}>Random</button>
            Faster
            <input type='range' min='10' max='145' step='15' defaultValue='10'
              onChange={this.handleChange.bind(this)} />
            Slower
          </div>
        </div>
      </div>
    );
  }
}

export default Sudoku;
