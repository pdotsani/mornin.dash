'use strict'

//Dependencies
var React = require('react');

// Components
var LocationComponent = require('../components/LocationComponent');
var TimeComponent = require('../components/TimeComponent');
var DateComponent = require('../components/DateComponent');
var ForecastComponent = require('../components/ForecastComponent');
var DayComponent = require('../components/DayComponent');

//page layout
var styles = {
  container: {
    fontFamily:'helvetica',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    alignItems: 'center'
  }
}

var SlimSkin = function(props) {
  var data = props.data;
  return (
    <div style={styles.container}>
      <TimeComponent data={data.time} />
      <DateComponent data={data.date} />
      <LocationComponent data={data.locations} />
      <ForecastComponent data={data.allWeather} />
    </div>
  )
}

module.exports = SlimSkin;
