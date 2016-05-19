'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var FiveDaysForecast = require('./FiveDaysForecast')

var styles = {
	listDiv: {
		listStyle:'none',
		padding:'0',
		margin:'0',
		display: 'flex',
		flexDirection: 'column'
	}
}


function Weather(props) {
	console.log("Weather comp: ",props);
	return (
			<ul style={styles.listDiv}>
        <FiveDaysForecast fiveDays={props.fiveDays}/>
			</ul>
	)
};

Weather.contextTypes = {
  router: React.PropTypes.object.isRequired,
  city: React.PropTypes.string,
  country: React.PropTypes.string,
  region: React.PropTypes.string,
  currently: React.PropTypes.object,
  daily: React.PropTypes.object,
	fiveDays: React.PropTypes.array
};

module.exports = Weather;
