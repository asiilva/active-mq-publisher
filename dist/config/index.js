'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var env = process.env.NODE_ENV || 'development';
var config = require('./' + env);

var globalSettings = {
  api: {
    version: '1.0'
  }
};

exports.default = Object.assign(globalSettings, config);
module.exports = exports['default'];