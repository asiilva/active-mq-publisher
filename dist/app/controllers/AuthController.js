'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _publisher = require('../publisher');

var _publisher2 = _interopRequireDefault(_publisher);

var _logger = require('../util/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthController = function () {
  function AuthController() {
    _classCallCheck(this, AuthController);

    this.messagePublisher = _publisher2.default;
  }

  _createClass(AuthController, [{
    key: 'persist',
    value: function persist(userId) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var user = {
          steamUserId: userId
        };

        _this.messagePublisher.publish('newUser', JSON.stringify(user)).then(resolve).catch(reject);
      });
    }
  }]);

  return AuthController;
}();

exports.default = AuthController;
module.exports = exports['default'];