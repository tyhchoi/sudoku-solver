import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Square extends Component {
  static propTypes = {
    value: PropTypes.string
  }

  render() {
    return (
      <td className="square">
        {this.props.value}
      </td>
    );
  }
}

export default Square;
