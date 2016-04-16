'use strict';

var Request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var Firebase = require('firebase');
var FIREBASE_URL = 'https://mornin-dash.firebaseIO.com';
var GEOCODE_URL = 'http://www.mapquestapi.com/geocoding/v1/reverse';

/**
 * Wrapper for calling navigator.geolocation, supported by chrome browser
 * additional functionality needs to be added here, including a prompt for
 * city data if this fails...
 */
var getLocation = {
  now: function() {
    var lat, lon, city, region;
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(data) {
        lat = data.coords.latitude;
        lon = data.coords.longitude;
        // Insert superagent request to get city, state info
        Request
          .get(GEOCODE_URL)
          // Firebase this...
          .query({key: 'PA1o2sAYp5Z6DVfnZRxMBGYw9xOVz2BB'})
          .query({callback: 'renderReverse'})
          .query({location: lat+','+lon})
          .end(function(err, res) {
            if(err) reject(err);
            console.log('LOCATION:', res);
            resolve({
              lat: lat,
              lon: lon
              });
            });
          });
    });
  }
};

module.exports = getLocation;