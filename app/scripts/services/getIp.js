'use strict';

var Request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var C = require('../constants/Constants');

/**
 * Wrapper for calling ipApi.com json file
 */
var getIp = {
  now: function() {
    return new Promise(function (resolve, reject) {
      Request
        .get('http://ip-api.com/json')
        .end(function (err, res) {
          if(err) reject();
          resolve(JSON.parse(res.text));
        });
    });
  }
};

module.exports = getIp;