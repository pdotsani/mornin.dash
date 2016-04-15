'use strict';

var React = require('react');

var styles = {
    listDiv: {
        listStyle:'none',
        padding:'0',
        margin:'0',
        display: 'flex',
        flexDirection: 'column'
    },
    listItem: {
        display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
        marginBottom: '20px',
    borderBottom:'1px solid #333',
    height:'50px'
    },
    listChild_1: {
      display: 'flex',
      alignItems: 'center',
    },
    listChild_1_inner: {
        display: 'flex',
      flexDirection: 'column',
      marginLeft: '10px'
    },
    icon:{
        fontSize:"50px"
    },
    day:{
        fontWeight: 'bold'
    }
}

function ForecastComponent(props) {
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
}

module.exports = ForecastComponent;
