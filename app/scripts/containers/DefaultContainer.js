'use strict';

var React = require('react');
var Moment = require('moment');
var Forecast = require('forecast.io-bluebird');
var getIp = require('../services/getIp')
var TimeComponent = require('../components/TimeComponent');
var DateComponent = require('../components/DateComponent');
var Weather = require('../components/Weather');
var C = require('../constants/Constants');

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

  tick: function() {
    this.setState({
      time: Moment().format("h:mm:ss a"),
      date: Moment().format("dddd, MMMM Do YYYY")
    })
  },

	getInitialState: function() {
    return {
      time: Moment().format("dddd, MMMM Do YYYY"),
      date: Moment().format("h:mm:ss a")
    }
	},

  componentWillMount: function() {
    var ipInfo;
    var weatherInfo;

    var getWeather = function(data) {
      ipInfo = data;
      forecast
        .fetch(data.lat, data.lon)
        .then(sendData)
        .catch(function(err) {
          console.warn(err);
        })
    }

    var sendData = function(data) {
      weatherInfo = data;
      this.setState({
        city: ipInfo.city,
        country: ipInfo.country,
        region: ipInfo.regionName,

        currently: weatherInfo.currently,
        daily: weatherInfo.daily
      })
    }.bind(this);

    this.serverRequest = getIp
      .now()
      .then(getWeather)
      .catch(function(err) {
        console.warn(err);
      });
  },

  componentDidMount: function() {
    setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        <TimeComponent data={this.state.time} />
        <DateComponent data={this.state.date} />
        <Weather 
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