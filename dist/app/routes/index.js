'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _authRoutes = require('./authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var router = _express2.default.Router();

  router.get('/', function (req, res) {
    res.sendFile(_path2.default.join('C:\\github\\folks-gaming-web-app\/dist' + '/index.html'));
  });

  router.use('/auth', (0, _authRoutes2.default)());

  return router;
};

module.exports = exports['default'];