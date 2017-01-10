import React from 'react';
import Dancer from './Dancer.react';
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
    let dancers = [];
    for (let i = 0; i < 8; i++) {
      dancers.push(<Dancer x={50 * (1 + i)} y={50} r={20} key={i}/>);
    }
    return { dancers: dancers };
  },

  render() {
    return (
      <div>
        <svg width={this.props.width} height={this.props.height} xmlns='http://www.w3.org/2000/svg' version="1.1">
          <Grid width={this.props.width} height={this.props.height} interval={50}/>
          {this.state.dancers}
        </svg>
      </div>
    );
  }
});

export default Formations;
