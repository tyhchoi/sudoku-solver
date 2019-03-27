import React from 'react';
import PropTypes from 'prop-types';

class Square extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    cName: PropTypes.string
  }

  render() {
    const {cName, value} = this.props;
    return (
      <td className={cName}>
        {value}
      </td>
    );
  }
}

export default Square;
