import React, { Component } from 'react';
import Square from './Square';

class Grid extends Component {
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
