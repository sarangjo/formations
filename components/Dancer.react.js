import React from 'react';

const SIMPLE = false;
const DUR = 800; // total duration
const INT = 20; // interval between movements
import C from '../constants.js';

let intervalId;

const Dancer = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    r: React.PropTypes.number,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  getInitialState() {
    return {
      realX: this.props.x,
      realY: this.props.y
    };
  },

  componentWillReceiveProps(nextProps) {
    if (SIMPLE) {
      this.setState({
        realX: nextProps.x,
        realY: nextProps.y
      });
    } else {
      this.moveTo(nextProps.x, nextProps.y);
    }
  },

  moveTo(x, y) {
    let dX = Number((x - this.state.realX) / (DUR / INT));
    let dY = Number((y - this.state.realY) / (DUR / INT));
    let counter = 0;
    intervalId = setInterval(function(thisArg) {
      if (counter == (DUR/INT)) {
        window.clearInterval(intervalId);
        return;
      }
      counter++;
      thisArg.setState({
        realX: thisArg.state.realX + dX,
        realY: thisArg.state.realY + dY
      });
    }, INT, this);
  },

  getDefaultProps() {
    return { x: 0, y: 0, r: 20, id: 0 };
  },

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  },

  render() {
    let color = "white";
    if (this.props.id[0] == 'A' || this.props.id[0] == 'C') color = "aqua";
    else if (this.props.id[0] == 'B' || this.props.id[0] == 'D') color = "red";

    let x = this.state.realX + C.CENTER.x;
    let y = this.state.realY + C.CENTER.y;

    return (
      <g>
        <circle cx={x} cy={y} r={this.props.r} fill={color} strokeWidth={5} stroke="black"
          onClick={this.handleClick}/>
        <text textAnchor={'middle'} x={x} y={y + 6} fontSize={18}>{this.props.id.toUpperCase().substring(0,Math.min(this.props.id.length, 3))}</text>
      </g>
    );
  }
});

export default Dancer;
