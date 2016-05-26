'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router');
var Store = require('store');

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
			gotStyles: navigator.geolocation ? true : false
		}
	},

	componentWillMount: function() {
		if(navigator.geolocation) {
			this.useGeolocation();
		}
	},

	componentDidMount: function() {
		Store.remove('setup');
	},

	goGetStyles: function() {
		this.setState({ gotStyles: false });
	},

	componentWillUnmount: function() {
		Store.set('setup', {
			city: this.state.city,
			country: this.state.country,
			county: this.state.county,
			state: this.state.state,
			lat: this.state.lat,
			lon: this.state.lon
		});
	},

	useGeolocation: function() {
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
							lon: data.lon,
						});
					}.bind(this))
					.catch(function(err) {
						console.error(err);
					});
			}.bind(this));
	},

	getLocation: function(event) {
		var location = this.refs.locstring.value;
		this.serverRequest = getLocation
			.regular(location)
			.then(function(data) {
				this.setState({
					city: data.city,
					country: data.country,
					county: data.county,
					lat: data.lat,
					lon: data.lon,
					gotStyles: true
				});
			}.bind(this))
			.catch(function(err) {
				console.error(err);
			});
	},

	handleSetupConfig: function() {
		this.context.router.push('/default');
	},


	render: function() {
		return (
			this.state.gotStyles  == true
			?<div style={styles.confirmLocation}>
				<h2>Confirm your location...</h2>
				<h1>{this.state.city} {this.state.state}</h1>
				<h1>{this.state.county}</h1>
				<button
					type='button'
					style={styles.confirmButton}
					onClick={this.handleSetupConfig}
					>Yes!</button>
				<button
					type='button'
					style={styles.confirmButton}
					onClick={this.goGetStyles}
					>Nope!</button>
			</div>
			:<form 
				style={styles.setupContainer}
				onSubmit={this.getLocation}>
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