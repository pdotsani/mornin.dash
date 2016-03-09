'use strict';

var Moment = require('moment');

var Time = {
	// Get Time in Array Format
	function getObject() {
		return Moment().toObject();
	};

	// Detect if value is at 00
	function isZero(val) {
		return val === 0;
	};

	// Update value of key
	function updateValue(key) {

	};
}

module.exports = Time;