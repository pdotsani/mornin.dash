'use strict';

var React = require('react');

var styles = {
	mainDiv: {
		background: 'transparent'
	},
	menuBar: {
		position: 'fixed',
		width: '100%',
		paddingTop: '5px',
		paddingBottom: '5px',
		paddingLeft: '25px',
		paddingRight: '25px',
		background: 'transparent'
	}
};

var Main = React.createClass({
	
	render: function() {
		return (
			<div style={styles.mainDiv}>
				<div style={styles.menuBar}>
					<i className="icon ion-android-menu size-64"></i>
				</div>
				{this.props.children}
			</div>
		)
	}
});

module.exports = Main;