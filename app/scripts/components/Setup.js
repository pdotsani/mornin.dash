'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router');
var Mapquest = require('../services/mapquestApi');

var styles = {
	setupContainer: {
		background: 'transparent'
	},
	loadingHeader: {
		fontSize: '6em',
		marginTop: '200px',
		transition: 'fontWeight 700',
	  textAlign: 'center',
	}
};

var Setup = React.createClass({

	contextTypes: {
	  router: React.PropTypes.object.isRequired
	},

	componentWillMount: function() {

	},

	componentDidMount: function() {
		if(navigator.geolocation) {
			navigator
				.geolocation
				.getCurrentPosition(function(position) {
					var lat = position.coords.latitude;
					var lon = position.coords.longitude;
					this.serverRequest = Mapquest
						.geoReverse(lat, lon)
						.then(function(data) {
							console.log('MapquestSvc:', data);
						}.bind(this))
						.catch(function(err) {
							console.error(err);
						});
				});
		} else {

		}
	},

	componentWillUnmount: function() {
		
	},

	render: function() {
		return (
			<div style={styles.setupContainer}>
				<input type='text' style={styles.loadingHeader} />
			</div>	
		)
	}
});

module.exports = Setup;