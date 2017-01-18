import React from 'react';
import * as firebase from 'firebase';
import Dot from './Dot.react.js';
import Constants from '../constants.js';

const Choreographer = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    id: React.PropTypes.string.isRequired,
    steps: React.PropTypes.array.isRequired,
    onSaveSteps: React.PropTypes.func
  },

  getInitialState() {
    return {
      id: this.props.id,
      steps: this.props.steps
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      steps: nextProps.steps
    });
  },

  handleClick(evt) {
    var dim = this.refs.svg.getBoundingClientRect();
    var x = evt.clientX - dim.left;
    var y = evt.clientY - dim.top;
    x = Math.round(x / Constants.INTERVAL) * Constants.INTERVAL;
    y = Math.round(y / Constants.INTERVAL) * Constants.INTERVAL;
    this.state.steps.push({x: x, y: y});
    this.forceUpdate();
  },

  undoClicked() {
    if (this.state.steps.length) {
      this.state.steps.pop();
    }
    this.forceUpdate();
  },

  saveClicked() {
    this.props.onSaveSteps(this.state.id, this.state.steps);
  },

  loadClicked() {
    // this.setState(formation2);
  },

  render() {
    let formation = this.state.steps.map((dancer, i) => {
      return (
        <Dot {...dancer} key={i}/>
      );
    });

    let stepNumbers = this.state.steps.map((dancer, i) => {
      return (
        <text x={dancer.x + (Constants.INTERVAL / 2)} y={dancer.y} key={i}>{i}</text>
      )
    });

    return (
      <div>
        {this.state.id}
        <button onClick={this.undoClicked}>Undo</button>
        <button onClick={this.saveClicked}>Save</button>
        <button onClick={this.loadClicked}>Load</button>
        <br/>
        <svg ref="svg" width={this.props.width} height={this.props.height} xmlns='http://www.w3.org/2000/svg' version="1.1" onClick={this.handleClick}>
          {this.props.grid}
          {formation}
          {stepNumbers}
        </svg>
      </div>
    );
  }
});

export default Choreographer;
