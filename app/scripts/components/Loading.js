'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router');

var Loading = React.createClass({
	
	contextTypes: {
	  router: React.PropTypes.object.isRequired
	},

	componentDidMount: function() {
		setTimeout(function() {
			this.context.router.push({
				pathname: '/default'
			})
		}.bind(this), 5000);	
	},

	render: function() {
		return (
			<h1>Loading...</h1>
		)
	}
});

module.exports = Loading;