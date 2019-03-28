import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

const LENGTH = 9;

class Grid extends React.Component {
  static propTypes = {
    grid: PropTypes.array
  }

  render() {
    const { grid } = this.props;

    const rows = grid.map((arr, i) => {
      return (
        <tr key={'row-' + i}>
          {arr.map((val, j) => {
            let cName = 'square';

            if (i % 3 === 0) {
              cName += ' top';
            } else if (i === LENGTH - 1) {
              cName += ' bottom';
            }

            if (j % 3 === 0) {
              cName += ' left';
            } else if (j === LENGTH - 1) {
              cName += ' right';
            }

            return (<Square key={i+'-'+j} value={val} cName={cName} />);
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
