import React from 'react';

const Grid = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    interval: React.PropTypes.number
  },

  getInitialProps() {
    return {
      width: 0, height: 0, interval: 0
    };
  },

  render() {
    let horizontals = [];
    for (let i = 0; i <= this.props.height; i += this.props.interval) {
      horizontals.push(
        <line x1={0} y1={i} x2={this.props.width} y2={i} strokeWidth={1} stroke="black" key={"h-" + i}/>
      );
    }

    let verticals = [];
    for (let i = 0; i <= this.props.width; i += this.props.interval) {
      verticals.push(
        <line x1={i} y1={0} x2={i} y2={this.props.height} strokeWidth={1} stroke="black" key={"v-" + i}/>
      );
    }

    return (
      <g>
        {horizontals}
        {verticals}
      </g>
    );
  }
});

export default Grid;
