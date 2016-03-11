'use strict';

var React = require('react');
var PropTypes = React.PropTypes;


var styles = {
	listDiv: {
		listStyle:'none',
		padding:'0',
		margin:'0',
		display: 'flex',
		flexDirection: 'column'
	},
	listItem: {
		padding: '0',
		margin: '0',
		maxHeight: '250px'
	}
}

function puke(obj) {
	return <li style={styles.listItem}>{JSON.stringify(obj, 2, ' ')}</li>
}

function Weather(props) {
	return (
			<ul style={styles.listDiv}>
				<li style={styles.listItem}>{props.city}, {props.country}, {props.region}</li>
				{puke(props.currently)}
				{puke(props.daily)}
			</ul>
	)
};

Weather.contextTypes = {
  router: React.PropTypes.object.isRequired,
  city: React.PropTypes.string,
  country: React.PropTypes.string,
  region: React.PropTypes.string,
  currently: React.PropTypes.object,
  daily: React.PropTypes.object
};

module.exports = Weather;