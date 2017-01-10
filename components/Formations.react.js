import React from 'react';
import Choreographer from './Choreographer.react';
import Grid from './Grid.react';

/**
 * TODO
 */
const Formations = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      width: 1000,
      height: 500
    };
  },

  getInitialState() {
    return {
      stepN: 0
    };
  },

  buttonClicked() {
    this.setState({
      stepN: this.state.stepN + 1
    });
  },

  render() {
    return (
      <div>
        <svg width={this.props.width} height={this.props.height} xmlns='http://www.w3.org/2000/svg' version="1.1">
          <Grid width={this.props.width} height={this.props.height} interval={50}/>
          <Choreographer stepN={this.state.stepN}/>
        </svg>
        <br/>
        <button onClick={this.buttonClicked}>Next</button>
      </div>
    );
  }
});

export default Formations;
