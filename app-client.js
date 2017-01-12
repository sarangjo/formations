const React = require('react');
import { render } from 'react-dom';
import Formations from './components/Formations.react';
import * as firebase from 'firebase';

// The element to feed into
const app = document.getElementById('app');

let config = {
  apiKey: "AIzaSyBy7v5rk8x6scB9uzmesYe1kQLRLMNCmGw",
  authDomain: "dance-formations.firebaseapp.com",
  databaseURL: "https://dance-formations.firebaseio.com",
  storageBucket: "dance-formations.appspot.com"
};
firebase.initializeApp(config);

// Shortcut for ReactDOM.render() via importing the property 'render'
// (which is a function) from the ReactDOM module
render(<Formations/>, app);
