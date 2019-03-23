import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

class Grid extends Component {
  static propTypes = {
    grid: PropTypes.array
  }

  render() {
    const { grid } = this.props;

    const rows = grid.map((arr, i) => {
      return (
        <tr key={'row-' + i}>
          {arr.map((val, j) => {
            return (<Square key={i+'-'+j} value={val} />)
          })}
        </tr>
      )
    });

    return (
      <table>
          <tbody>
            {rows}
          </tbody>
        </table>
    );
  }
}

export default Grid;
