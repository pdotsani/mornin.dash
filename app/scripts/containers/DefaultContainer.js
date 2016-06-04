'use strict';

// Dependencies
var React = require('react');
var Moment = require('moment');
var getWeather = require('../services/getWeather');
var Store = require('store');

// Components
var LocationComponent = require('../components/LocationComponent');
var TimeComponent = require('../components/TimeComponent');
var DateComponent = require('../components/DateComponent');
var ForecastComponent = require('../components/ForecastComponent');
var LoadingComponent = require('../components/LoadingComponent');
var DayComponent = require('../components/DayComponent');

//page layout
var styles = {
  containerStyles: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingBottom: '25px'
  }
}

var DefaultContainer = React.createClass({

  contextTypes: {
    city: React.PropTypes.string,
    country: React.PropTypes.string,
    state: React.PropTypes.string,
    region: React.PropTypes.string,
    currently: React.PropTypes.object,
    daily: React.PropTypes.object,
  },


	getInitialState: function() {
    var setup = Store.get('setup');
    return {
      time: Moment().format("h:mm:ss a"),
      date: Moment().format("dddd, MMMM Do"),
      day: Moment().format("dddd"),
      locations: {
        city: setup.city,
        country: setup.country,
        county: setup.region,
        state: setup.state
      },
      lat: setup.lat,
      lon: setup.lon,
      gotWeather: false
    }
  },

  componentWillMount: function() {
    this.serverRequest = getWeather
      .now(this.state.lat, this.state.lon)
      .then(function(data) {
        this.setState({
          allWeather: data,
          gotWeather: true
        });
      }.bind(this))
      .catch(function(err) {
        console.error(err);
      });
  },

  render: function() {
    return (
      <div style={styles.containerStyles}>
        <TimeComponent
        data={this.state.time} />
        <DateComponent
        data={this.state.date} />
        <LocationComponent data={this.state.locations} />
       {
        (this.state.gotWeather) ?
            <ForecastComponent
            data={this.state.allWeather} />
        : <LoadingComponent />
      }
      </div>
    )
  }
});

module.exports = DefaultContainer;
