import React from 'react';
import PropTypes from 'prop-types';

class CSSThemeChanger extends React.Component {
  static propTypes = {
    theme: PropTypes.object
  }

  componentDidMount() {
    this.updateCSS(this.props.theme);
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      this.updateCSS(this.props.theme);
    }
  }

  updateCSS(theme) {
    Object.keys(theme).forEach(key => {
      document.documentElement.style.setProperty(key, theme[key]);
    });
  }

  render() {
    return (<div>{this.props.children}</div>);
  }
}

export default CSSThemeChanger;
