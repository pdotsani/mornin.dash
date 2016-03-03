'use strict';

var React = require('react');
var Moment = require('moment');

var Time = React.createClass({displayName: 'DateTimeBox',

	getInitialState: function() {
	  return {
	    time: Moment().format("dddd, MMMM Do YYYY"),
      date: Moment().format("h:mm:ss a")
	  };
	},

  componentDidMount: function() {
    setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  tick: function() {
    this.setState({
      time: Moment().format("dddd, MMMM Do YYYY"),
      date: Moment().format("h:mm:ss a")
    });
  },

  render: function() {
    return (
      React.createElement('p', {className: "DateTimeBox"},
        "Hello, world! I am a TimeBox!.\n" + 
        this.state.date + " " +this.state.time
      )
    );
  }
});

module.exports = Time;
