'use strict';

// Dependencies
var React = require('react');
var Moment = require('moment');
var getWeather = require('../services/getWeather');
var Store = require('store');
var LoadingComponent = require('../components/LoadingComponent');


//skins
var DefaultSkin = require('../skins/default');
var SlimSkin = require('../skins/slim');


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
      date: Moment().format("MMMM Do YYYY"),
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
      (this.state.gotWeather) ?
        <DefaultSkin data={this.state}/>
      : <LoadingComponent />
    )
  }
});

module.exports = DefaultContainer;
