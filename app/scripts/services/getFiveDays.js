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
    clear: 'icon-WEATHER_DAY',
    cloudy: 'icon-WEATHER_CLOUDY',
    defaultIcon: 'icon-WEATHER_DAY'
  }

  var IconNames = Object.keys(WeatherIcons)

  //make icons dynamic based on weather summary text 'str'
  function mapIcons(str){

    // incase of new summary text or
    var defaultIcon = WeatherIcons.defaultIcon;

    var found = false;
    var icon = defaultIcon;

    IconNames.forEach(function (ele,i) {
      if(found) return;
      var reqex = new RegExp(ele,'i');
      if(reqex.test(str)){
        found = true;
        icon = WeatherIcons[ele];
      }
    })

    return icon;
  }


  function fiveDayWeather(data){
     var weather = data.daily.data;

    weather.splice(-3) // cut 8 days of weatherinfo to 5
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
