'use strict';

var Request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var C = require('../constants/Constants');

/**
 * Wrapper for calling ipApi.com API and forecast.io
 */
var getIp = {
  now: function() {
    return new Promise(function (resolve, reject) {
      Request
        .get(C.IP_API_URL)
        .end(function (err, res) {
          if(err) reject();
          resolve(JSON.parse(res.text));
        });
    });
  }
};

module.exports = getIp;