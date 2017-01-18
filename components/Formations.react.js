import React from 'react';
import Display from './Display.react';
import * as firebase from 'firebase';
import Grid from './Grid.react';
import Choreographer from './Choreographer.react';

import constants from '../constants.js';
const MODES = constants.MODES;

var formation1 = require('../formation1.js');
var formation2 = require('../formation2.js');

const Formations = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      width: constants.CENTER.x * 2,
      height: constants.CENTER.y * 2
    };
  },

  getInitialState() {
    return {
      choreo: {},
      mode: true,
      doneLoading: false
    };
  },

  componentWillMount() {
    var choreo = {};
    _.forOwn(formation1.choreo, (dancer, key) => {
      choreo[key] = dancer.concat(formation2.choreo[key]);
    });

    this.setState({
      choreo: choreo,
      doneLoading: true
    });
    // firebase.database().ref('/').on('value', (snapshot) => {
    //   this.setState({
    //     choreo: snapshot.val() || {},
    //     doneLoading: true
    //   });
    // });
  },

  handleEdit(id) {
    this.setState({
      currentId: id,
      mode: false
    })
  },

  handleNewDancer(id) {
    this.setState({
      currentId: id,
      mode: false
    });
  },

  handleOffset(key, x, y, name) {
    let steps = this.state.choreo[key];
    let offsetSteps = steps.map((step, i) => {
      return {x: step.x + x, y: step.y + y};
    });
    firebase.database().ref(name).set(offsetSteps);
  },

  handleSaveSteps(id, steps) {
    firebase.database().ref(id).set(steps);
    this.setState({
      currentId: null,
      mode: true
    });
  },

  render() {
    let grid = (
      <Grid {...this.props}/>
    );
    let content;
    if (this.state.doneLoading) {
      if (this.state.mode) {
        content = (
          <Display {...this.props}
            grid={grid}
            choreo={this.state.choreo}
            onEdit={this.handleEdit}
            onNewDancer={this.handleNewDancer}
            onOffset={this.handleOffset}/>
        );
      } else {
        content = (
          <Choreographer {...this.props} id={this.state.currentId} steps={this.state.choreo[this.state.currentId] || []} grid={grid} onSaveSteps={this.handleSaveSteps}/>
        )
      }

      return (
        <div>
          <div>
            {this.state.mode ? "Dancers" : "Choreo"}
          </div>
          {content}
        </div>
      );
    } else {
      return (
        <div>Loading</div>
      );
    }
  }
});

export default Formations;
