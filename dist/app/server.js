'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _httpStatus = require('http-status');

var _expressValidation = require('express-validation');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _logger = require('./util/logger');

var _logger2 = _interopRequireDefault(_logger);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = function () {
  function Server(config) {
    _classCallCheck(this, Server);

    this.port = config.server.port;
    this.app = (0, _express2.default)();
    this.app.server = _http2.default.createServer(this.app);
    this.app.use(_bodyParser2.default.json());
    this.app.use((0, _cors2.default)());
    this.app.use((0, _routes2.default)());
    this.app.use(_express2.default.static('public'));

    this.app.use(function (err, req, res, next) {
      if (err instanceof _expressValidation.ValidationError) {
        res.status(err.status).json(err.errors);
      } else {
        next(err);
      }
    });

    this.app.use(function (err, req, res, next) {
      _logger2.default.error(err.message);
      res.status(_httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
      next();
    });
  }

  _createClass(Server, [{
    key: 'start',
    value: function start() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.app.listen(_this.port).on('listening', resolve).on('error', reject);
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.app.server.close();
    }
  }]);

  return Server;
}();

exports.default = Server;
module.exports = exports['default'];