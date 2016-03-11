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
var Loading = require('../components/Loading');

var forecast = new Forecast({
    key: C.FORECAST_IO_API
});

var styles = {
  containerStyles: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'flex-start',
    paddingLeft:'24px',
    paddingRight:'24px',
    paddingBottom: '25px'
  },
  dateTimeContainer: {
    paddingTop: '80px',
    minWidth:'750px',
    display:'flex',
    flexDirection:'column'
  },
  weatherContainer: {
    maxWidth:'350px',
    display:'flex',
    flexDirection:'column'
  }
}

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
      isLoaded: false,
      time: Moment().format("dddd, MMMM Do YYYY"),
      date: Moment().format("h:mm:ss a")
    }
	},

  componentWillMount: function() {
    /* 
     *  3 Step process to get location and weather data 
     */
    var ipInfo;
    var weatherInfo;

    // Step 2: Using ipinfo data, get weather data
    var getWeather = function(data) {
      ipInfo = data;
      forecast
        .fetch(data.lat, data.lon)
        .then(sendData)
        .catch(function(err) {
          console.warn(err);
        });
    }

    // Step 3: Assign data to component state
    var sendData = function(data) {
      weatherInfo = data;
      this.setState({
        city: ipInfo.city,
        country: ipInfo.country,
        region: ipInfo.regionName,
        currently: weatherInfo.currently,
        daily: weatherInfo.daily,
        isLoaded: true
      });
    }.bind(this);

    // Step 1: Get location information
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
      this.state.isLoaded === false
      ? <Loading />
      : <div style={styles.containerStyles}>
          <div style={styles.dateTimeContainer}>
            <TimeComponent
              data={this.state.time} />
            <DateComponent
              data={this.state.date} />
          </div>
          <div style={styles.weatherContainer}>
            <Weather 
              city={this.state.city}
              country={this.state.country}
              region={this.state.region}
              currently={this.state.currently}
              daily={this.state.daily} />
          </div>
        </div>
    )
  }
});

module.exports = DefaultContainer;