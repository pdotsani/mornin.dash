'use strict';

//Dependencies
var React = require('react');
var Moment = require('moment');

var styles = {
	time: {
		margin: '0',
		fontSize: '7em',
		opacity: '0.75'
	}
};

var TimeComponent = React.createClass({

	getInitialState: function() {
	 return {
		 time: Moment().format("h:mm:ss a")
	  }
	},

  // Refacor to reduce load time?
	// Re-sets the time and date in one seccond intervals
	tick: function() {
    this.setState({
      time: Moment().format("h:mm:ss a")
    })
	},

	componentDidMount: function() {
		// Autoupdate time in 1 sec intervals
		setInterval(this.tick, 1000);
	},

	render: function () {
		return (
			<h1 style={styles.time}>
				{this.state.time}
			</h1>
		)
	}
})

module.exports = TimeComponent;
