import React from 'react';
import Dancer from './Dancer.react.js';
import _ from 'lodash';
import Constants from '../constants.js';

let intervalId;

const Display = React.createClass({
  propTypes: {
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    choreo: React.PropTypes.object,
    grid: React.PropTypes.element,
    onEdit: React.PropTypes.func,
    onNewDancer: React.PropTypes.func,
    onOffset: React.PropTypes.func
  },

  getInitialState() {
    return {
      stepN: 0,
      formation: this.getFormation(0),
      doneLoading: false,
      value: '',
      isNormal: true, // as opposed to in "Offset" mode
      intervalId: 0
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      formation: this.getFormation(this.state.stepN)
    });
  },

  shouldStop(stepN) {
    var shouldStop = false;
    _.forOwn(this.props.choreo, (value, key) => {
      shouldStop = shouldStop || (this.state.stepN == value.length - 1);
    });
    return shouldStop;
  },

  getFormation(stepN) {
    let formation = {};
    _.forOwn(this.props.choreo, (value, key) => {
      formation[key] = (value[stepN % value.length]);
    });
    return formation;
  },

  nextClicked() {
    if (this.shouldStop()) {
      this.stopClicked();
    } else {
      this.setState({
        stepN: this.state.stepN + 1,
        formation: this.getFormation(this.state.stepN + 1)
      });
    }
  },

  startClicked() {
    this.setState({
      stepN: 0,
      formation: this.getFormation(0)
    }, () => {
      intervalId = setInterval(function(thisArg) {
        thisArg.nextClicked();
      }, 1500, this);
    });
  },

  stopClicked() {
    clearInterval(intervalId);
  },

  resetClicked() {
    this.setState({
      stepN: 0,
      formation: this.getFormation(0)
    });
  },

  handleChange(event) {
    this.setState({value: event.target.value});
  },

  handleNewDancer() {
    if (this.state.value) {
      this.props.onNewDancer(this.state.value);
    }
  },

  dancerClicked(key) {
    if (this.state.isNormal) {
      this.props.onEdit(key);
    } else {
      let x = Number(prompt("x offset", "0"));
      let y = Number(prompt("y offset", "0"));
      let name = (prompt("name", "0"));
      this.props.onOffset(key, x, y, name);
      this.setState({
        isNormal: true
      });
    }
  },

  offsetClicked() {
    this.setState({
      isNormal: false
    });
  },

  handleClick(evt) {
    if (this.props.onEdit) {
      var dim = this.refs.svg.getBoundingClientRect();
      var x = evt.clientX - dim.left;
      var y = evt.clientY - dim.top;
      x = Math.round(x / Constants.INTERVAL) * Constants.INTERVAL;
      y = Math.round(y / Constants.INTERVAL) * Constants.INTERVAL;

      let clickHandled = false;
      _.forOwn(this.state.formation, (position, key) => {
        if (!clickHandled && position.x == x && position.y == y) {
          this.dancerClicked(key);
          clickHandled = true;
        }
      });
    }
  },

  render() {
    let formation = [];
    _.forOwn(this.state.formation, (dancer, key) => {
      formation.push(
        <Dancer {...dancer} id={key} key={key} onClick={this.handleClick.bind(this, key)}/>
      );
    });

    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.handleNewDancer}>New Dancer</button>
        <br/>
        <button disabled={!this.state.isNormal} onClick={this.nextClicked}>Next</button>
        <button disabled={!this.state.isNormal} onClick={this.startClicked}>Start</button>
        <button disabled={!this.state.isNormal} onClick={this.stopClicked}>Stop</button>
        <button disabled={!this.state.isNormal} onClick={this.resetClicked}>Reset</button>
        <button disabled={!this.state.isNormal} onClick={this.offsetClicked}>Offset</button>
        <div>Step number: {this.state.stepN}</div>
        <svg ref="svg" width={this.props.width} height={this.props.height} xmlns='http://www.w3.org/2000/svg' version="1.1" onClick={this.handleClick}>
          {this.props.grid}
          {formation}
          <circle cx={Constants.CENTER.x} cy={Constants.CENTER.y} r={5}/>
        </svg>
        <h1>Audience here</h1>
      </div>
    );
  }
});

export default Display;
