import React from 'react';
import PropTypes from 'prop-types';

class Square extends React.Component {
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
