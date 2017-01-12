import React from 'react';

const Dot = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    r: React.PropTypes.number,
    onClick: React.PropTypes.func
  },

  getDefaultProps() {
    return { x: 0, y: 0, r: 5, id: 0 };
  },

  render() {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    return (
      <circle cx={this.props.x} cy={this.props.y} r={this.props.r}/>
    );
  }
});

export default Dot;
