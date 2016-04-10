'use strict';

var Forecast = require('forecast.io-bluebird');
var getIp = require('../services/getIp');
var Firebase = require('firebase');
var Request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var FIREBASE_URL = 'https://mornin-dash.firebaseIO.com';

/**
 * Wrapper for calling weather data
 */
var getWeather = {
  now: function() {
    var ipInfo;
    var weatherInfo;
    var ref = new Firebase(FIREBASE_URL);
    var forecast;

    return new Promise(function (resolve, reject) {
      /* 
       *  4 Step process to get location and weather data
       * 
       */
      
      // Step 2: Get location information
      var getIpInfo = function() {
        getIp
          .now()
          .then(getWeather)
          .catch(function(err) {
            console.error(err);
          });
      }.bind(this);

      // Step 3: Using ipinfo data, get weather data
      var getWeather = function(data) {
        ipInfo = data;
        forecast
          .fetch(data.lat, data.lon)
          .then(sendData)
          .catch(function(err) {
            console.error(err);
          });
      }

      // Step 4: Resolve promise and return data
      var sendData = function(data) {
        weatherInfo = data;
        // Unauthorize Firebase Connection
        ref.unauth();
        resolve({
          city: ipInfo.city,
          country: ipInfo.country,
          region: ipInfo.regionName,
          currently: weatherInfo.currently,
          daily: weatherInfo.daily,
          isLoaded: true
        });
      }.bind(this);

      // Step 1: Anonymous user auth to firebase
      ref.authAnonymously(function(error, cred) { 
          if(error) console.error(error);
          Request
            .get(FIREBASE_URL + '/forecast/key.json')
            .query({auth: cred.token})
            .end(function(err, res) {
              if(err) console.error(err);
              forecast = new Forecast({
                key: res.body
              });
            });
          getIpInfo();
        }, {
          remember: "sessionOnly"
      });
    });
  }
};

module.exports = getWeather;