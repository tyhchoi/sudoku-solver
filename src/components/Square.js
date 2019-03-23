import React, { Component } from 'react';

class Square extends Component {
  render() {
    return (
      <td className="square">
        {this.props.value}
      </td>
    );
  }
}

export default Square;
