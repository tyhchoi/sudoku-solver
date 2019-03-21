import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  render() {
    const { grid } = this.props;

    const rows = grid.map((arr, i) => {
      return (
        <tr key={'row-' + i}>
          {arr.map((val, j) => {
            return (<Square value={val} key={i+'-'+j} />)
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

export default Board;
