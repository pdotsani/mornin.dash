'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router');
// var Transition = require('react-addons-css-transition-group'); // disable for now...
var _ = require('lodash');

var styles = {
	loadingContainer: {
		display: 'flex',
	},
	loadingHeader: {
		margin: 'auto'
	},
	zoom: {
		fontSize: '1.5em'
	}	
};

var Loading = React.createClass({

	contextTypes: {
	  router: React.PropTypes.object.isRequired,
	  message: React.PropTypes.array,
	  time: PropTypes.number
	},

	renderMessage: function() {
		return _.forEachRight(this.state.message, function(letter, key) {
			return 	<span key={key}>letter</span>			
		});
	},

	// disabled for now... 
	// zoomLetter: function() {
	// 	var index = Math.floor(Math.random()*(this.length-1));
	// 	console.log('arrValue: ', messageArr[index]);
	// },

	randomTime: function() {
		return Math
			.floor(Math
			.random()*
			(this.state.time/messageArr.length));
	},

	componentWillMount: function() {
		this.setState({
			message: 'loading'.split(''),
			time: 5000
		});
	},

	componentDidMount: function() {
		this.header = document.body.getElementsByTagName('h1')[0];
		this.messageArr = this.header.childNodes;
		this.length = this.messageArr.length;
		// this.state = setInterval(this.zoomLetter, this.randomTime); // disable for now...
	},

	componentWillUnmount: function() {
		clearInterval(this.state);
	},

	render: function() {
		return (
			<div style={styles.loadingContainer}>
				<h1 style={styles.loadingHeader}>
					{this.renderMessage()}
				</h1>
			</div>	
		)
	}
});

module.exports = Loading;