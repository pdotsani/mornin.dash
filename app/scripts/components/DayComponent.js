'use strict'

//Dependencies
var React = require('react');

var styles = {
  position: 'relative',
  transform: 'rotate(-90deg)',
  fontSize: '5em',
  margin: 'auto 0'
}
var DayComponent = React.createClass({

  render: function(){
    var day = this.props.data;
    return (
      <div style={styles}>
        {day}
      </div>
    )
  }

});

module.exports = DayComponent;
