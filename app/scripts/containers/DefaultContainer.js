'use strict';

// Dependencies
var React = require('react');
var Moment = require('moment');
var getWeather = require('../services/getWeather');
var Store = require('store');

// Components
var TimeComponent = require('../components/TimeComponent');
var DateComponent = require('../components/DateComponent');
var Weather = require('../components/Weather');
var Navbar = require('../components/Navbar');

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
    state: React.PropTypes.string,
    region: React.PropTypes.string,
    currently: React.PropTypes.object,
    daily: React.PropTypes.object,
    fiveDays: React.PropTypes.array
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
    var setup = Store.get('setup');
    return {
      time: Moment().format("dddd, MMMM Do YYYY"),
      date: Moment().format("h:mm:ss a"),
      city: setup.city,
      country: setup.country,
      county: setup.region,
      state: setup.state,
      lat: setup.lat,
      lon: setup.lon,
      gotWeather: false
    }
  },

  componentWillMount: function() {
    this.serverRequest = getWeather
      .now(this.state.lat, this.state.lon)
      .then(function(data) {
        console.log('getWeather: ', data);
        this.setState({
          currently: data.currently,
          daily: data.daily,
          fiveDays: data.fiveDays,
          gotWeather: true
        });
      }.bind(this))
      .catch(function(err) {
        console.error(err);
      });
  },

  componentDidMount: function() {
    // Autoupdate time in 1 sec intervals
    setInterval(this.tick, 1000);
  },

  render: function() {
    return (
      <div style={styles.containerStyles}>
          <Navbar />
          <div style={styles.dateTimeContainer}>
            <TimeComponent
              data={this.state.time} />
            <DateComponent
              data={this.state.date} />
            <h2>{this.state.city}, {this.state.country}</h2>
            <h2>{this.state.county} {this.state.state}</h2>
          </div>
          {
            this.state.gotWeather === true
            ?<div style={styles.weatherContainer}>
                <Weather
                  currently={this.state.currently}
                  daily={this.state.daily}
                  fiveDays={this.state.fiveDays} />
            </div>
            :<p>loading...</p>
          }
        </div>
    )
  }
});

module.exports = DefaultContainer;
