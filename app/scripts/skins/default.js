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
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '1200px',
    height: '90%',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    alignItems: 'center'
  },

  mainContent: {
    padding:'0',
    margin:'0',
    display: 'flex',
    width: '80%',
    height: '70%',
    justifyContent: 'space-between'
  },

  dayComp: {
    position: 'relative',
    width: '10%',
    flexDirection: 'column',
    width: '10%',
    display: 'flex',
    alignItems: 'center'
  },

  timeLocationDateComp: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center'
  },

  forecastComp: {
    display: 'flex',
    justifyContent: 'center',
    width:'100%',
  }
}

var DefaultSkin = function(props) {
  var data = props.data;
  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>

        <div style={styles.dayComp}>
          <DayComponent data={data.day} />
        </div>

        <div style={styles.timeLocationDateComp}>
          <TimeComponent data={data.time} />
          <DateComponent data={data.date} />
          <LocationComponent data={data.locations} />
        </div>
      </div>

      <div style={styles.forecastComp}>
        <ForecastComponent data={data.allWeather} />
      </div>

    </div>
  )
}

module.exports = DefaultSkin;
