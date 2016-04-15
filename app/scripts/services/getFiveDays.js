'use strict';

var Moment = require('moment');


function fiveDayWeather(data){
   var weather = data.daily.data;
   weather.splice(0,1)
   weather.splice(-2)
   var format = weather.map(function(ele,i){
      var obj = {};
      obj.day = Moment.unix(ele.time).format("dddd");
      obj.minTemp = Math.floor(ele.apparentTemperatureMin);
      obj.maxTemp = Math.floor(ele.apparentTemperatureMax );
      var tempSummary = ele.icon.replace(/-/g,' ').split(' ');
      obj.summary =  (tempSummary.length  > 1) ?
      tempSummary.slice(0,2).join(' ') : tempSummary.join(' ');
      return obj;
  })
  return format;
}

module.exports = fiveDayWeather;
