const React = require('react');
import { render } from 'react-dom';
import Formations from './components/Formations.react';

// The element to feed into
const app = document.getElementById('app');
// Shortcut for ReactDOM.render() via importing the property 'render'
// (which is a function) from the ReactDOM module
render(<Formations/>, app);
