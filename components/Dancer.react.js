import React from 'react';

const Dancer = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    r: React.PropTypes.number
  },

  getDefaultProps() {
    return { x: 0, y: 0, r: 20 };
  },

  render() {
    return (
      <circle cx={this.props.x} cy={this.props.y} r={this.props.r}/>
    );
  }
});

export default Dancer;
