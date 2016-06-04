'use strict'

//Dependencies
var React = require('react');

var DayComponent = React.createClass({

  render: function(){
    var day = this.props.data;
    return (
      <div>
        {day}
      </div>
    )
  }

});

module.exports = DayComponent;
