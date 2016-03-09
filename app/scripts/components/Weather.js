'use strict';

var React = require('react');
var PropTypes = React.PropTypes;

function puke(obj) {
	return <pre style={{width:'300px'}}>{JSON.stringify(obj, null, '\n')}</pre>
}

function Weather(props) {
	return (
		<div>
			<pre>{props.city}, {props.country}, {props.region}</pre>
			{puke(props.currently)}
			{puke(props.daily)}
		</div>
	)
}

Weather.contextTypes = {
  router: React.PropTypes.object.isRequired,
  city: React.PropTypes.string,
  country: React.PropTypes.string,
  region: React.PropTypes.string,
  currently: React.PropTypes.object,
  daily: React.PropTypes.object
};

module.exports = Weather;