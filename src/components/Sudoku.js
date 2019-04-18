import React from 'react';
import Grid from './Grid';
import Solver from './Solver';

class Sudoku extends React.Component {
  constructor() {
    super();
    const grid = Solver.randomGrid();
    const gridStates = Solver.solve(JSON.parse(JSON.stringify(grid)));
    gridStates.unshift(JSON.parse(JSON.stringify(grid)));

    this.state = {
      grid,
      gridStates,
      interval: 10,
      count: 0,
      timer: null,
      runningLoop: false
    };
  }

  loop() {
    const initialInterval = this.state.interval;
    let { count } = this.state;
    if (count === 0) {
      count++;
    }

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

      if (count === this.state.gridStates.length - 1) {
        this.setState(prevState => ({
          count,
          runningLoop: !prevState.runningLoop
        }));
        clearInterval(timer);
      }
    }, this.state.interval);

    this.setState({timer});
  }

  newRandom() {
    clearInterval(this.state.timer);

    const grid = Solver.randomGrid();
    const gridStates = Solver.solve(JSON.parse(JSON.stringify(grid)));
    gridStates.unshift(JSON.parse(JSON.stringify(grid)));

    this.setState({
      grid,
      gridStates,
      count: 0,
      timer: null,
      runningLoop: false
    });
  }

  solveOrStop() {
    this.setState(prevState => ({
      runningLoop: !prevState.runningLoop
    }));

    if (!this.state.runningLoop) {
      this.loop();
    }
  }

  prevState() {
    this.setState(prevState => ({
      count: prevState.count - 1,
      grid: prevState.gridStates[prevState.count - 1]
    }));
  }

  nextState() {
    this.setState(prevState => ({
      count: prevState.count + 1,
      grid: prevState.gridStates[prevState.count + 1]
    }));
  }

  resetGrid() {
    clearInterval(this.state.timer);

    if (this.state.runningLoop) {
      this.setState(prevState => ({
        runningLoop: !prevState.runningLoop
      }));
    }

    this.setState({grid: this.state.gridStates[0], count: 0});
  }

  handleIntervalChange(e) {
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
            <button
              disabled={this.state.runningLoop || this.state.count === 0}
              onClick={() => this.prevState()}>
              &#9664;
            </button>
            <button disabled={this.state.count >= this.state.gridStates.length}
              onClick={() => this.solveOrStop()}>
              {this.state.runningLoop ? 'Stop' : 'Start'}
            </button>
            <button
              disabled={this.state.runningLoop || this.state.count === this.state.gridStates.length - 1}
              onClick={() => this.nextState()}>
              &#9654;
            </button>
            <button onClick={() => this.resetGrid()}>Reset</button>
            <button onClick={() => this.newRandom()}>Random</button>
            Faster
            <input type='range' min='10' max='145' step='15' defaultValue='10'
              onChange={this.handleIntervalChange.bind(this)} />
            Slower
          </div>
        </div>
      </div>
    );
  }
}

export default Sudoku;
