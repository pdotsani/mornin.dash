'use strict';

//Dependencies
var Forecast = require('forecast.io-bluebird');
var Firebase = require('firebase');
var Request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var FIREBASE_URL = 'https://mornin-dash.firebaseIO.com';
var ref = new Firebase(FIREBASE_URL);

/**
 * Wrapper for calling weather data
 */
var getWeather = {
  now: function(lat, lon) {
    return new Promise(function (resolve, reject) {
      /*
       *  3 Step process to get location and weather data
       */

      // Step 2: Using mapquest Geolocation API info, get forecast
      var getWeather = function(key) {
        var fio = new Forecast({ key: key });
        fio
          .fetch(lat, lon)
          .then(sendData)
          .catch(function(err) {
            console.error(err);
          });
      }

      // Step 3: Resolve promise and return data
      var sendData = function(data) {

        // Unauthorize Firebase Connection
        ref.unauth();
        resolve({
          current: data.currently,
          daily: data.daily
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
              getWeather(res.body);
            });
        }, {
          remember: "sessionOnly"
      });
    });
  }
};

module.exports = getWeather;
