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
      isLooping: false
    };
  }

  loop() {
    const initialInterval = this.state.interval;
    let { count } = this.state;

    const timer = setInterval(() => {
      count++;
      this.setState({grid: this.state.gridStates[count]});

      if (initialInterval !== this.state.interval) {
        this.setState({count});
        clearInterval(timer);
        this.loop();
      }

      if (!this.state.isLooping) {
        this.setState({count});
        clearInterval(timer);
      }

      if (count === this.state.gridStates.length - 1) {
        this.setState(prevState => ({
          count: count,
          isLooping: !prevState.isLooping
        }));
        clearInterval(timer);
      }
    }, this.state.interval);

    this.setState({timer});
  }

  newRandomGrid() {
    clearInterval(this.state.timer);

    const grid = Solver.randomGrid();
    const gridStates = Solver.solve(JSON.parse(JSON.stringify(grid)));
    gridStates.unshift(JSON.parse(JSON.stringify(grid)));

    this.setState({
      grid,
      gridStates,
      count: 0,
      timer: null,
      isLooping: false
    });
  }

  toggleLoop() {
    this.setState(prevState => ({
      isLooping: !prevState.isLooping
    }));

    if (!this.state.isLooping) {
      this.loop();
    }
  }

  prevGridState() {
    this.setState(prevState => ({
      count: prevState.count - 1,
      grid: prevState.gridStates[prevState.count - 1]
    }));
  }

  nextGridState() {
    this.setState(prevState => ({
      count: prevState.count + 1,
      grid: prevState.gridStates[prevState.count + 1]
    }));
  }

  resetGrid() {
    clearInterval(this.state.timer);

    if (this.state.isLooping) {
      this.setState(prevState => ({
        isLooping: !prevState.isLooping
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
              disabled={this.state.isLooping || this.state.count === 0}
              onClick={() => this.prevGridState()}>
              &#9664;
            </button>
            <button disabled={this.state.count >= this.state.gridStates.length}
              onClick={() => this.toggleLoop()}>
              {this.state.isLooping ? 'Stop' : 'Start'}
            </button>
            <button
              disabled={this.state.isLooping || this.state.count === this.state.gridStates.length - 1}
              onClick={() => this.nextGridState()}>
              &#9654;
            </button>
            <button onClick={() => this.resetGrid()}>Reset</button>
            <button onClick={() => this.newRandomGrid()}>Random</button>
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
