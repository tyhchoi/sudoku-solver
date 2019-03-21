import React, { Component } from 'react';

class Square extends Component {
  render() {
    return (
      <button type="text" className="square">
        {this.props.value}
      </button>
    );
  }
}

export default Square;
