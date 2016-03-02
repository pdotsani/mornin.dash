'use strict';

var React = require('react');
var IpApi = require('../services/IpApi');
var Forecast = require('forecast.io-bluebird');
var C = require('../constants/Constants');

var Component = React.createClass({displayName: 'DataBox',

	getInitialState: function() {
	  return {
	    ip: '',
	    weather: ''
	  };
	},

  componentDidMount: function() {
    var ipInfo;
    var fioInfo;
    var forecast = new Forecast({
      key: C.FORECAST_IO_API
    });

    var getForecast = function(data) {
      ipInfo = data;
      console.dir(ipInfo, null);  // Test console
      this.serverRequest = forecast
        .fetch(ipInfo.lat, ipInfo.lon)
        .then(bindData);
    };

    var bindData = function(data) {
      console.dir(data, null); // Test console
      fioInfo = data;
      this.setState({
          ip: ipInfo,
          weather: fioInfo
        });
    }.bind(this);

    this.serverRequest = IpApi
      .get()
      .then(getForecast);  
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      React.createElement('p', {className: "DataBox"},
        "Hello, world! I am a DataBox!." + 
        JSON.stringify(this.state.ip) + " " + JSON.stringify(this.state.weather)
      )
    );
  }
});

module.exports = Component;
