var React = require('react');

var styles = {
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

function Navbar() {
	return (
		<div style={styles.menuBar}>
			<i className="icon ion-android-menu size-64"></i>
		</div>
	)
};

module.exports = Navbar