'use strict';

// Dependencies
var React = require('react');
var Moment = require('moment');
var Forecast = require('forecast.io-bluebird');
var getIp = require('../services/getIp');
var C = require('../constants/Constants');

// Components
var TimeComponent = require('../components/TimeComponent');
var DateComponent = require('../components/DateComponent');
var Weather = require('../components/Weather');

var forecast = new Forecast({
    key: C.FORECAST_IO_API
});

var DefaultContainer = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    city: React.PropTypes.string,
    country: React.PropTypes.string,
    region: React.PropTypes.string,
    currently: React.PropTypes.object,
    daily: React.PropTypes.object
  },

  // Re-sets the time and date in one seccond intervals
  // Refacor to reduce load time?
  tick: function() {
    this.setState({
      time: Moment().format("h:mm:ss a"),
      date: Moment().format("dddd, MMMM Do YYYY")
    })
  },

	getInitialState: function() {
    return {
      isDataLoaded: false,
      time: Moment().format("dddd, MMMM Do YYYY"),
      date: Moment().format("h:mm:ss a")
    }
	},

  componentWillMount: function() {

    // 3 Step process to get location and weather data
    var ipInfo;
    var weatherInfo;

    // Using ipinfo data, get weather data
    var getWeather = function(data) {
      ipInfo = data;
      forecast
        .fetch(data.lat, data.lon)
        .then(sendData)
        .catch(function(err) {
          console.warn(err);
        })
    }

    // Step 3 assign data to component state
    var sendData = function(data) {
      weatherInfo = data;
      this.setState({
        city: ipInfo.city,
        country: ipInfo.country,
        region: ipInfo.regionName,
        currently: weatherInfo.currently,
        daily: weatherInfo.daily
      })
      isDataLoaded: true
    }.bind(this);

    // Step 1
    this.serverRequest = getIp
      .now()
      .then(getWeather)
      .catch(function(err) {
        console.warn(err);
      });
  },

  componentDidMount: function() {
    // Autoupdate time in 1 sec intervals
    setInterval(this.tick, 1000);
  },

  render: function() {
    return (
      <div>
        <TimeComponent
          isDataLoaded={this.state.isDataLoaded}
          data={this.state.time} />
        <DateComponent
          isDataLoaded={this.state.isDataLoaded}
          data={this.state.date} />
        <Weather
          isDataLoaded={this.state.isDataLoaded}
          city={this.state.city}
          country={this.state.country}
          region={this.state.region}
          currently={this.state.currently}
          daily={this.state.daily} />
      </div>
    )
  }
});

module.exports = DefaultContainer;