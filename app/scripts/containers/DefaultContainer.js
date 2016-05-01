'use strict';

// Dependencies
var React = require('react');
var Moment = require('moment');
var getWeather = require('../services/getWeather');

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
    return {
      isLoaded: false,
      time: Moment().format("dddd, MMMM Do YYYY"),
      date: Moment().format("h:mm:ss a")
    }
	},

  componentWillMount: function() {
    this.serverRequest = getWeather
      .now()
      .then(function(data) {
        this.setState({
          city: data.city,
          country: data.country,
          region: data.region,
          currently: data.currently,
          daily: data.daily,
          fiveDays: data.fiveDays,
          isLoaded: data.isLoaded
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
          </div>
          <div style={styles.weatherContainer}>
            <Weather
              city={this.state.city}
              country={this.state.country}
              region={this.state.region}
              currently={this.state.currently}
              daily={this.state.daily}
              fiveDays={this.state.fiveDays} />
          </div>
        </div>
    )
  }
});

module.exports = DefaultContainer;
