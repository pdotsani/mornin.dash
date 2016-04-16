'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var Router = require('react-router');
// disable for now...
// var Transition = require('react-addons-css-transition-group'); 
var _ = require('lodash');

var styles = {
	loadingContainer: {
		background: 'transparent'
	},
	loadingHeader: {
		fontSize: '6em',
		marginTop: '200px',
		transition: 'fontWeight 700',
	  textAlign: 'center',
	}
};

var Loading = React.createClass({

	contextTypes: {
	  router: React.PropTypes.object.isRequired,
	  message: React.PropTypes.array,
	  time: React.PropTypes.number
	},

	renderMessage: function() {
		return _.forEachRight(this.state.message, function(letter, key) {
			return 	<span key={key}>letter</span>			
		});
	},

	zoomLetter: function() {
		var index = Math.floor(Math.random()*(this.length-1));
		var luckySpan = this.messageArr[index];
		luckySpan.style.fontWeight='100';
		luckySpan.style.fontWeight='10000';
	},

	componentWillMount: function() {
		this.setState({
			message: 'loading'.split(''),
			time: 100
		});
	},

	componentDidMount: function() {
		this.header = document.body.getElementsByTagName('h1')[0];
		this.messageArr = this.header.childNodes;
		this.length = this.messageArr.length;
		this.interval = setInterval(this.zoomLetter, this.state.time);
	},

	componentWillUnmount: function() {
		clearInterval(this.interval);
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