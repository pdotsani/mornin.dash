'use strict';

var Moment = require('moment');

  var WeatherIcons = {
    rain:'icon-WEATHER_RAIN',
    snow: 'icon-WEATHER_SNOW',
    wind: 'icon-WEATHER_WINDY',
    fog: 'icon-WEATHER_FOG',
    sleet: 'icon-WEATHER_SLEET',
    thunder: 'icon-WEATHER_THUNDER',
    hail: 'icon-WEATHER_HAIL',
    tonardo: 'icon-WEATHER_TORNADO',
    cloudy: 'icon-WEATHER_CLOUDY',
    'clear-day': 'icon-WEATHER_DAY',
    'clear-night': 'icon-WEATHER_NIGHT',
    'partly-cloudy-day': 'icon-WEATHER_PARTYCLOUDY-DAY',
    'partly-cloudy-night': 'icon-WEATHER_PARTLYCLOUDYNIGHT',
    day: 'icon-WEATHER_DAY',
    night: 'icon-WEATHER_NIGHT'
  }


  //make icons dynamic based on weather summary text 'str'
  function mapIcons(str,time){

    var icon = null;

    //  use icon description 'str' to find match in WeatherIcons obj
    if(WeatherIcons.hasOwnProperty( str.toLowerCase())){
      icon = WeatherIcons[str];
    } else {
       /*  if no match, set icon to day or night based on reqex
           if reqex fails set icon to day     */
      icon =  /day/i.test(str) ? WeatherIcons.day :
              /night/i.test(str) ? WeatherIcons.night :
              WeatherIcons.day ;
    }
    return icon;
  }


  function fiveDayWeather(data){
     var weather = data.daily.data;
    weather.splice(-1) // cut 8 days of weatherinfo to 5
     var format = weather.map(function(ele,i){
        var obj = {};
        obj.day = (i == 0 ) ? 'Now' : Moment.unix(ele.time).format("dddd");
        obj.minTemp = Math.floor(ele.apparentTemperatureMin);
        obj.maxTemp = Math.floor(ele.apparentTemperatureMax );
        var tempSummary = ele.icon.replace(/-/g,' ').split(' ');
        obj.summary =  (tempSummary.length  > 1) ?
        tempSummary.slice(0,2).join(' ') : tempSummary.join(' ');
        obj.icon =  mapIcons(ele.icon) //dynamic icon;
        return obj;
    })
    return format;
  }

module.exports = fiveDayWeather;
