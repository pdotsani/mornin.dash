'use strict';

var Request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var Firebase = require('firebase');
var FIREBASE_URL = 'https://mornin-dash.firebaseIO.com';
var MAPQUEST_URL = 'http://www.mapquestapi.com/geocoding/v1';
var ref = new Firebase(FIREBASE_URL);

var Mapquest = {
  geoReverse: function(key, locString) {
    return new Promise(function (resolve, reject) {
      Request
        .get(MAPQUEST_URL + '/reverse')
        .query({key: key})
        // locString = lat + ',' + lon;
        .query({location: locString})
        .query({outFormat: "json"})
        .end(function(err, res) {
          if(err) reject(err);
          var location = res.body.results[0].locations[0];
          resolve({
            country: location.adminArea1,
            state: location.adminArea3,
            county: location.adminArea4,
            city: location.adminArea5
          });
        });
    });
  },

  geoRegular: function(key, location) {
    return new Promise(function (resolve, reject) {
      var regularGeo = function(key) {
        Request
          .get(MAPQUEST_URL + '/address')
          .query({key: key})
          // location = '1095 something street city, state zip'
          .query({location: location})
          .query({inFormat: 'kvp'})
          .query({outFormat: 'json'})
          .end(function(err, res) {
            if(err) reject(err);
            resolve({
              lat: res.results[0].latLng.lat,
              lon: res.results[0].latLng.lon,
              city: res.results[0].adminArea5,
              region: res.results[0].adminArea3
            });
          });
      }
    });
  }
};

module.exports = Mapquest;