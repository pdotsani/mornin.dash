'use strict';

var React = require('react');
var PropTypes = React.PropTypes;


var styles = {
	listDiv: {
		listStyle:'none',
		padding:'0',
		margin:'0',
		display: 'flex',
		flexDirection: 'column'
	},
	listItem: {
		padding: '0',
		margin: '0',
		maxHeight: '250px'
	}
}

function Weather(props) {
	return (
      <ul style={styles.listDiv}>
    	{   
    		props.fiveDays.map(function(ele,i){
    			return (
    				<li style={styles.listItem} key={i}> 
    			 		<div style={styles.listChild_1}>
								<span style={styles.icon} className="icon-WEATHER_CLOUDY"> </span>
								<span style={styles.listChild_1_inner}>
    							<span style={styles.day}> {ele.day}</span>
    							<span> {ele.summary }</span> 
    						</span>
    					</div>
    					<div>
    					  {ele.maxTemp} <sup>&#8457;</sup> / {ele.minTemp } <sup>&#8457;</sup>
    				  </div>
    				</li>
    				)
    		})
      } 
      </ul>
    )
};

Weather.contextTypes = {
  router: React.PropTypes.object.isRequired,
  city: React.PropTypes.string,
  country: React.PropTypes.string,
  region: React.PropTypes.string,
  currently: React.PropTypes.object,
  daily: React.PropTypes.object
};

module.exports = Weather;