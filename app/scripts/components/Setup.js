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
	  textAlign: 'center',
		background: 'transparent'
	},
	formHeader: {
		margin: '250px 0 0 0',
		fontSize: '4em'
	},
	inputHeader: {
		fontSize: '6em',
		margin: '0 200px',
		transition: 'fontWeight 700'
	},
	confirmButton: {
		fontSize: '3em',
		background: 'transparent',
		borderRadius: '25px',
		margin: '0 15px'
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
					this.serverRequest = getLocation
						.reverse(lat, lon)
						.then(function(data) {
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
		}
	},

	regularGeoLocation: function(event) {
		var location = this.refs.locstring.value;
		this.serverRequest = getLocation
			.regular(location)
			.then(function(data) {
				this.setState({
					city: data.city,
					country: data.country,
					county: data.county,
					lat: data.lat,
					lon: data.lon
				});
			}.bind(this))
			.catch(function(err) {
				console.error(err);
			});
	},

	componentWillUnmount: function() {
		
	},

	render: function() {
		return (
			this.state.geo_enabled  == true
			?<div style={styles.confirmLocation}>
				<h2>Confirm your location...</h2>
				<h1>{this.state.city} {this.state.state}</h1>
				<h1>{this.state.county}</h1>
				<button
					type='button'
					style={styles.confirmButton}
					>Yes!</button>
				<button
					type='button'
					style={styles.confirmButton}
					>Nope!</button>
			</div>
			:<form 
				style={styles.setupContainer}
				onSubmit={this.regularGeoLocation}>
				<h2 style={styles.formHeader}>Enter your address...</h2>
				<input 
					type='text' 
					style={styles.inputHeader} 
					ref='locstring'/>
			</form>
		)
	}
});

module.exports = Setup;