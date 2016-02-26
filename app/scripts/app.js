
var React = require('react');
// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;
//var Timer = require("./ui/Timer");
var ReactDOM = require('react-dom');
var Component = require('./components/Component');
var IpApi = require('./services/IpApi');

ReactDOM.render(
	React.createElement(Component, {data: IpApi.get()}),
	document.getElementById('app')
);