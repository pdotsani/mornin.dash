'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router');
var getLocation = require('../services/getLocation');

var styles = {
	confirmLocation: {
		textAlign: 'center'
	},
	setupContainer: {
		background: 'transparent'
	},
	loadingHeader: {
		fontSize: '6em',
		margin: '200px',
		transition: 'fontWeight 700',
	  textAlign: 'center',
	}
};

var Setup = React.createClass({

	contextTypes: {
	  router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			geo_enabled: true     
		}
	},

	componentWillMount: function() {

	},

	componentDidMount: function() {
		if(navigator.geolocation) {
			navigator.geolocation
				.getCurrentPosition(function(position) {
					var lat = position.coords.latitude;
					var lon = position.coords.longitude;
					console.log(position);
					this.serverRequest = getLocation
						.reverse(lat, lon)
						.then(function(data) {
							console.log("RESULT: ", data);
							this.setState({
								city: data.city,
								country: data.country,
								state: data.state,
								county: data.county,
								lat: data.lat,
								lon: data.lon
							});
						}.bind(this))
						.catch(function(err) {
							console.error(err);
						});
				}.bind(this));
		} else {
			this.setState({geo_enabled: false});
			// Cue get geolocation form
		}
	},

	regularGeoLocation: function() {
		this.serverRequest = getLocation
			.regular(location)
			.then(function(data) {
				console.log(data);
				/*
				this.setState({
					city: // data.city,
					country: // data.country,
					county: // data.county,
					lat: // data.lat,
					lon: // data.lon
				});
				*/
			}.bind(this))
			.catch(function(err) {
				console.error(err);
			});
	},

	componentWillUnmount: function() {
		
	},

	render: function() {
		return (
			this.state.geo_enabled == true
			?<div style={styles.confirmLocation}>
				<p>Confirm your location...</p>
				<h1>{this.state.city} {this.state.state}</h1>
				<h1>{this.state.county}</h1>
			</div>
			:<div style={styles.setupContainer}>
					<p>Enter your address...</p>
					<input type='text' style={styles.loadingHeader} />
			</div>	
		)
	}
});

module.exports = Setup;