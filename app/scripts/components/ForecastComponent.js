'use strict';

//Dependencies
var React = require('react');
var processWeather = require('../services/processWeather')

// Components
var ForecastCardComponent = require('./ForecastCardComponent')

var styles = {
	listDiv: {
		listStyle:'none',
		padding:'0',
		margin:'0',
		display: 'flex',
		flexDirection: 'row'
	}
}

var ForecastComponent = React.createClass({

 	data: null,
	componentWillMount: function(){
	 this.data = processWeather(this.props.data)
	},

	render: function () {
   var data = this.data;
	 var forecastCard = []

	 for (var key in data) {
    forecastCard.push(
			<ForecastCardComponent key={key} data={ data[key] } />
		);
  }
	return (
			<div style={styles.listDiv}>
			{forecastCard}
			</div>
		)
	}
})

module.exports = ForecastComponent;