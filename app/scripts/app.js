'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Time = require('./components/DateTime');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

ReactDOM.render(
  React.createElement(Time, null),
  document.getElementById('app')
);