'use strict';

var Request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var Firebase = require('firebase');
var FIREBASE_URL = 'https://mornin-dash.firebaseIO.com';
var ref = new Firebase(FIREBASE_URL);
var Mapquest = require('./mapquestApi');


var getLocation = {
	regular: function(locinfo) {
		return new Promise(function (resolve, reject) {
			ref.authAnonymously(function(error, cred) {
        if(error) reject(error);
        Request
          .get(FIREBASE_URL + '/mapquest/key.json')
          .query({auth: cred.token})
          .end(function(err, res) {
            if(err) reject(err);
            Mapquest
              .geoRegular(res.body, locinfo)
              .then(function(data) {
                resolve(data);
              });
          }, {
            remember: "sessionOnly"
          });
      });
		});
	},
	reverse: function(lat, lon) {
		var locinfo = lat + ',' + lon;
		return new Promise(function (resolve, reject) {
			ref.authAnonymously(function(error, cred) {
        if(error) reject(error);
        Request
          .get(FIREBASE_URL + '/mapquest/key.json')
          .query({auth: cred.token})
          .end(function(err, res) {
            if(err) reject(err);
            Mapquest
              .geoReverse(res.body, locinfo)
              .then(function(data) {
                data.lat = lat;
                data.lon = lon;
                resolve(data);
              });
          }, {
            remember: "sessionOnly"
          });
      });
		});
	}
};

module.exports = getLocation;