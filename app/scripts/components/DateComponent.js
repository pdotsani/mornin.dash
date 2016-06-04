'use strict';

//Dependencies
var React = require('react');

var styles = {
	date: {
		margin: '0',
		fontSize: '6em'
	}
};


var DateComponent = React.createClass({

	render: function () {
		var date = this.props.data;
		return (
			<h3 style={styles.date}>{date}</h3>
		)
	}
})


module.exports = DateComponent;
