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

var styles = {
  containerStyles: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingBottom: '25px'
  },
  dateTimeContainer: {
    paddingTop: '175px',
    minWidth: '750px',
    display: 'flex',
    flexDirection: 'row'
  },
  dayStyles: {
    height: 'auto',
    display: 'flex',
    maxWidth: '125px'
  },
  noDay: {
    display: 'flex',
    flexDirection: 'column'
  },
  dayStylesHeader: {
    margin: '0px',
    padding: '0px',
    fontSize: '6em',
    transform: 'rotate(-90deg)',
    height: '264px',
    opacity: '.25'
  },
  locationStyles: {
    margin: '0px',
    padding: '5px 0 0 0',
    opacity: '0.2'
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
      date: Moment().format("MMMM Do YYYY"),
      day: Moment().format("dddd")
    })
  },

	getInitialState: function() {
    var setup = Store.get('setup');
    return {
      time: Moment().format("h:mm:ss a"),
      date: Moment().format("dddd, MMMM Do YYYY"),
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
        <div style={styles.dateTimeContainer}>
          <div style={styles.dayStyles}>
            <h1 style={styles.dayStylesHeader}>
              {this.state.day}
            </h1>
          </div>
          <div style={styles.noDay}>
            <TimeComponent
              data={this.state.time} />
            <DateComponent
              data={this.state.date} />
            <h2 style={styles.locationStyles}>
              {this.state.city},
              &nbsp;{this.state.state} 
              &nbsp;{this.state.county} 
              &nbsp;{this.state.country}
            </h2>
          </div> 
        </div>
        {
          this.state.gotWeather === true
          ?<Weather
            currently={this.state.currently}
            daily={this.state.daily}
            fiveDays={this.state.fiveDays} />
          :<p>loading...</p>
        }
      </div>
    )
  }
});

module.exports = DefaultContainer;
