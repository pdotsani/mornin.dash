// var Dispatcher = require('../core/Dispatcher');
// var Constants = require('../constants/Constants');
// var Promise = require('es6-promise').Promise; // jshint ignore:line
// var IpApi = require('../services/IpApi');

// var Action = {

//   getIp: function () {
//     IpApi
//       .get('/')
//       .then(function (data) {
//         console.log(data);
//         return data;
//         // Dispatcher.handleViewAction({
//           // actionType: Constants.ON_LOAD,
//           // data: data
//         // });        
//       })
//       .catch(function () {
//         console.log('Error: ip-api');
//         // Dispatcher.handleViewAction({
//           // actionType: Constants.ON_LOAD_ERROR,
//           // error: 'Error: ip-api'
//         // });      
//       });
//   }
// };

// module.exports = Action;