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
var Loading = require('../components/Loading');
var DefaultContainer = require('../containers/DefaultContainer');

var routes = (
	<Router history={hashHistory}>
		<Route path='/' component={Main}>
			<IndexRoute component={DefaultContainer} />
		</Route>
	</Router>
);

module.exports = routes;