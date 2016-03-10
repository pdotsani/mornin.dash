'use strict';

var React = require('react');

var styles = {
	time: {
		margin: '0',
		fontSize: '9em',
		color: 'black'
	}
};

function TimeComponent(info) {
	return (
		<h1 style={styles.time}>{info.data}</h1>
	)
}

module.exports = TimeComponent;