'use strict'

//Dependencies
var React = require('react');

var style = {
  margin: '0px',
  padding: '5px 0 0 0',
  opacity: '0.2'
};

var LocationComponent = React.createClass({

  render: function(){
    var location = this.props.data;
    return (
      <div>
        <h2 style={style}>
          {location.city},
          &nbsp;{location.state}
          &nbsp;{location.county}
          &nbsp;{location.country}
        </h2>
      </div>
    )
  }
})

module.exports = LocationComponent;
