'use strict';

var Request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var Firebase = require('firebase');
var FIREBASE_URL = 'https://mornin-dash.firebaseIO.com';
var MAPQUEST_URL = 'http://www.mapquestapi.com/geocoding/v1';
var ref = new Firebase(FIREBASE_URL);

var Mapquest = {
  geoReverse: function(lat, lon) {
    return new Promise(function (resolve, reject) {
      var locString = lat + ',' + lon;

      var reverseGeo = function(key) {
        ref.unauth();
        return new Promise(function (resolve, reject) {
          Request
            .get(MAPQUEST_URL + '/reverse')
            .query({key: key})
            .query({callback: 'renderReverse'})
            .query({location: locString})
            .end(function(err, res) {
              if(err) reject(err);
              resolve(res);
            });
        });
      }

      ref.authAnonymously(function(error, cred) {
        if(error) reject(error);
        Request
          .get(FIREBASE_URL + '/mapquest/key.json')
          .query({auth: cred.token})
          .end(function(err, res) {
            if(err) reject(err);
            var p = Promise.resolve(reverseGeo(res.body));
            p.then(function(data) {
              resolve(fin);
            });
          }, {
            remember: "sessionOnly"
          });
        
      });
    });
  },

  geoRegular: function(location) {
    return new Promise(function (resolve, reject) {
      var regularGeo = function(key) {
        ref.unauth();
        Request
          .get(MAPQUEST_URL + '/address')
          .query({key: key})
          .query({location: location})
          .query({callback: 'renderOptions'})
          .query({inFormat: 'kvp'})
          .query({outFormat: 'json'})
          .end(function(req, res) {
            resolve({
              lat: res.results[0].latLng.lat,
              lon: res.results[0].latLng.lon,
              city: res.results[0].adminArea5,
              region: res.results[0].adminArea3
            });
          });
      }

      ref.authAnonymously(function(error, cred) {
        if(error) reject(error);
        Request
          .get(FIREBASE_URL + '/mapquest/key.json')
          .query({auth: cred.token})
          .end(function(req, res) {
            if(err) reject(err);
            regularGeo(res.body);
          }, {
            remember: "sessionOnly"
          });
      });
    });
  }
};

module.exports = Mapquest;