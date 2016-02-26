var request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var Constants = require('../constants/Constants');

/**
 * Wrapper for calling a API
 */
var IpApi = {
  get: function () {
    return new Promise(function (resolve, reject) {
      request
        .get(Constants.IP_API_URL)
        .end(function (err, res) {
          if(err) reject();
          console.log(JSON.parse(res.text));
          resolve(JSON.parse(res.text));
        });
    });
  }
};

module.exports = IpApi;