'use strict';

var React = require('react');
var ReactRouter = require('react-router');


// ReactRouter properties
var Router = ReactRouter.Router; 
var Route = ReactRouter.Route; 
var IndexRoute = ReactRouter.IndexRoute; 
var hashHistory = ReactRouter.hashHistory; 

// Route Components / containers
var Main = require('../components/Main');
var Setup = require('../components/Setup');
var DefaultContainer = require('../containers/DefaultContainer');

var routes = (
	<Router history={hashHistory}>
		<Route path='/' component={Main}>
			<IndexRoute component={Setup} />
			<Route path='/default' component={DefaultContainer} />
		</Route>
	</Router>
);

module.exports = routes;