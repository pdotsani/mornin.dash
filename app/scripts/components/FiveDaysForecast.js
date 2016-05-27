'use strict';

var React = require('react');

var styles = {
    listDiv: {
      listStyle:'none',
      padding: '5px 0 0 90px',
      margin:'0',
      display: 'flex',
      flexDirection: 'row'
    },
    listItem: {
      display: 'flex',
      padding: '0 5px',
      alignItems: 'center',
      flexDirection: 'column'
    },
    icon: {
      fontSize: '6em',
      opacity: '0.25'
    },
    day: {
      fontSize: '1em',
      position: 'relative',
      top: '3px',
      opacity: '0.75'
    },
    temp: {
      fontSize: '4.5em',
      fontWeight: 'bold',
      opacity: '0.75'
    }
}

function ForecastComponent(props) {
  return (
    <ul style={styles.listDiv}>
      {
        props.fiveDays.map(function(ele,i){
          return (
            <li style={styles.listItem} key={i}>
              <div style={styles.day}>{ele.day}</div>
              <div style={styles.icon} className={ele.icon}></div>
              <div>{ele.maxTemp}&deg; / {ele.minTemp}&deg;</div>
            </li>
          )
        })
      }
    </ul>
  )
}

module.exports = ForecastComponent;
