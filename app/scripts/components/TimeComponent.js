'use strict';

var React = require('react');

var styles = {
	time: {
		margin: '0',
		fontSize: '7em',
		opacity: '0.75'
	}
};

function TimeComponent(info) {
	return (
		<h1 style={styles.time}>{info.data}</h1>
	)
}

module.exports = TimeComponent;