var ReactDOM = require('react-dom');
var IpApi = require('../services/IpApi');

var Component = React.createClass ({

	render: function() {
		return (
			React.createElement('p', null, JSON.stringify(this.props.data))
		);
	}
});

module.exports = Component;