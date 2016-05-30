'use strict'

//Dependencies
var React = require('react');

var styles = {
    icon: {
      fontSize: '6em',
      opacity: '0.25'
    },
    day: {
      fontSize: '1em',
      position: 'relative',
      top: '3px',
      opacity: '0.75'
    },
    temp: {
      fontSize: '4.5em',
      fontWeight: 'bold',
      opacity: '0.75'
    }
}

var ForecastCardComponent = React.createClass({

  render: function(){
    var data = this.props.data;
    return (
      <div>
        <div style={styles.day}>
          {data.day}
        </div>
        <div style={styles.icon} className={data.icon}>
        </div>
        <div>
          {data.maxTemp}&deg; / {data.minTemp}&deg;
        </div>
      </div>
    )
  }
})

module.exports = ForecastCardComponent;
