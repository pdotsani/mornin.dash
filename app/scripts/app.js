'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Component = require('./components/Component');

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

ReactDOM.render(
  React.createElement(Component, null),
  document.getElementById('app')
);'use strict';
