import React from 'react';
import Dancer from './Dancer.react.js';

const STEPS = [
  {x:150, y:150}, {x:200, y:150}, {x:200, y:200}, {x:150, y:200}, {x:150, y:150}
];

const Choreographer = React.createClass({
  propTypes: {
    stepN: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      stepN: 0
    };
  },

  getInitialState() {
    return {
      dancers: [STEPS[0]]
    };
  },

  componentWillReceiveProps(nextProps) {
    this.state.dancers[0] = (nextProps.stepN < STEPS.length ? STEPS[nextProps.stepN] : _.last(STEPS));
    this.setState({
      dancers: this.state.dancers
    });
  },

  render() {
    let dancers = this.state.dancers.map((dancer, i) => {
      return (
        <Dancer {...dancer} key={i}/>
      );
    });

    return (
      <g>
        {dancers}
      </g>
    );
  }
});

export default Choreographer;
