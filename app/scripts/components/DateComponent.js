'use strict';

var React = require('react');

function DateComponent(info) {
	return (
		<h1><small>{info.data}</small></h1>
	)
}

module.exports = DateComponent;