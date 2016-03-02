'use strict';

var request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var C = require('../constants/Constants');

/**
 * Wrapper for calling ipApi.com API
 */
var IpApi = {
  
  get: function () {
    return new Promise(function (resolve, reject) {
      request
        .get(C.IP_API_URL)
        .end(function (err, res) {
          if(err) reject();
          console.dir(JSON.parse(res), null);
          resolve(JSON.parse(res));
        });
    });
  }
};

module.exports = IpApi;var Request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var C = require('../constants/Constants');
var Jsonfile = require('jsonfile')
var Util = require('util')


/**
 * Wrapper for calling Open Weather API
 */
var OwApi = {

  // Request todays weather from 'city' (city is city id from cityList)
  get: function () {
    // var cityList;
  
    // Get OW City List JSON file
    // jsonfile.readFile(Constants.OW_CITIES_JSON, 
      // function(err, obj) {
        // if(err) console.error(err);
        // console.log(obj)
        // cityList = Jsonfile.readFileSync(Constants.OW_CITIES_JSON);
    // });
    return new Promise(function (resolve, reject) {
      Request
        .get(C.OW_API_URL)
        .query({'id': 5391997})
        .query({'APPID': C.OW_API_KEY})
        .end(function (err, res) {
          if(err) console.error(err);
          console.dir(JSON.parse(res), null);
          resolve(JSON.parse(res));
        });
    });
  }
};

module.exports = OwApi;
