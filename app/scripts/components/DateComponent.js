'use strict';

var React = require('react');

var styles = {
	date: {
		margin: '0',
		fontSize: '6em',
		color: 'grey'
	}
};

function DateComponent(info) {
	return (
		<h3 style={styles.date}>{info.data}</h3>
	)
}

module.exports = DateComponent;


