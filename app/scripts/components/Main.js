'use strict';

var React = require('react');

var Main = React.createClass({
	
	render: function() {
		return (
			<div>
				<i className="icon ion-android-menu size-32"></i>
				{this.props.children}
			</div>
		)
	}
});

module.exports = Main;