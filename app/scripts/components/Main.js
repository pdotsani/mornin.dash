'use strict';

var React = require('react');

var styles = {
	mainDiv: {
		background: 'transparent',
		height: '100%'
	}
};

var Main = React.createClass({

	render: function() {
	// Possibly find a way to load menu bar after theme loads?
		return (
			<div style={styles.mainDiv}>
				{this.props.children}
			</div>
		)
	}
});

module.exports = Main;
