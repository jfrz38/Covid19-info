var jwt = require('jsonwebtoken'); 
var moment = require('moment'); 
var config = require('../config');

exports.createToken = function(token) { 
  var payload = {
    sub: token, 
    iat: moment().unix(), 
    exp: moment().add(20, "minutes").unix(), 
  };
  return jwt.sign(payload, config.TOKEN_SECRET); 
};