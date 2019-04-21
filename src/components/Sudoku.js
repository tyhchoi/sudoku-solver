import React from 'react';
import Grid from './Grid';
import Solver from './Solver';
import CSSThemeChanger from './CSSThemeChanger';
import themes from '../files/themes';

class Sudoku extends React.Component {
  constructor() {
    super();
    const grid = Solver.randomGrid();
    const gridStates = Solver.solve(JSON.parse(JSON.stringify(grid)));
    gridStates.unshift(JSON.parse(JSON.stringify(grid)));

    this.state = {
      grid,
      gridStates,
      initialFilled: Solver.getInitialFilled(grid),
      interval: 10,
      count: 0,
      timer: null,
      isLooping: false,
      theme: themes.grayscale
    };

    this.newRandomGrid = this.newRandomGrid.bind(this);
    this.toggleLoop = this.toggleLoop.bind(this);
    this.prevGridState = this.prevGridState.bind(this);
    this.nextGridState = this.nextGridState.bind(this);
    this.resetGrid = this.resetGrid.bind(this);
    this.handleIntervalChange = this.handleIntervalChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  loop() {
    const {interval: initialInterval, gridStates} = this.state;
    let { count } = this.state;

    const timer = setInterval(() => {
      count++;
      this.setState({grid: gridStates[count]});

      if (initialInterval !== this.state.interval) {
        this.setState({count});
        clearInterval(timer);
        this.loop();
      }

      if (!this.state.isLooping) {
        this.setState({count});
        clearInterval(timer);
      }

      if (count === gridStates.length - 1) {
        this.setState({count, isLooping: false});
        clearInterval(timer);
      }
    }, initialInterval);

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
      initialFilled: Solver.getInitialFilled(grid),
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
    const {timer, gridStates} = this.state;

    clearInterval(timer);
    this.setState({grid: gridStates[0], count: 0, isLooping: false});
  }

  handleIntervalChange(e) {
    this.setState({interval: e.target.value});
  }

  handleThemeChange(e) {
    this.setState({theme: themes[e.target.value]})
  }

  render() {
    const {grid, gridStates, initialFilled, count, isLooping, theme} = this.state;

    return (
      <div>
        <CSSThemeChanger theme={theme} />
        <h1 className='title'>DFS Visualizer using Sudoku</h1>
        <div className='sudoku'>
          <div className='grid'>
            <Grid grid={grid} initialFilled={initialFilled} />
          </div>
          <div className='controls'>
            <select onChange={this.handleThemeChange}>
              <option value="grayscale">Grayscale</option>
              <option value="greenpink">Green/Pink</option>
              <option value="colorful">Colorful</option>
            </select>
            <button
              disabled={isLooping || count === 0}
              onClick={this.prevGridState}>
              &#9664;
            </button>
            <button disabled={count === gridStates.length - 1}
              onClick={this.toggleLoop}>
              {isLooping ? 'Stop' : 'Start'}
            </button>
            <button
              disabled={isLooping || count === gridStates.length - 1}
              onClick={this.nextGridState}>
              &#9654;
            </button>
            <button onClick={this.resetGrid}>Reset</button>
            <button onClick={this.newRandomGrid}>Random</button>
            Faster
            <input type='range' min='10' max='145' step='15' defaultValue='10'
              onChange={this.handleIntervalChange} />
            Slower
          </div>
        </div>
      </div>
    );
  }
}

export default Sudoku;
