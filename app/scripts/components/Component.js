'use strict';

var React = require('react');
var IpApi = require('../services/IpApi');
var OwApi = require('../services/OwApi');

var Component = React.createClass({displayName: 'DataBox',

	getInitialState: function() {
	  return {
	    ipInfo: '',
	    owInfo: ''
	  };
	},

  componentDidMount: function() {
    var ipInfo = IpApi.get();
    // Temp set to San Francisco County fixed...
    var owInfo = OwApi.get();
    console.dir(owInfo, null);
    console.dir(ipInfo, null);
    this.setState({
      ipInfo: ipInfo,
      owInfo: owInfo
    });
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      React.createElement('p', {className: "DataBox"},
        "Hello, world! I am a DataBox!.
" + 
        this.state.ipInfo + " " + this.state.owInfo
      )
    );
  }
});

module.exports = Component;
