'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stompit = require('stompit');

var _stompit2 = _interopRequireDefault(_stompit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessagePublisher = function () {
  function MessagePublisher(config) {
    _classCallCheck(this, MessagePublisher);

    this.config = config;
    var manager = new _stompit2.default.ConnectFailover([config.server], { maxReconnects: 10 });
    this.channelPool = new _stompit2.default.ChannelPool(manager);
  }

  _createClass(MessagePublisher, [{
    key: 'publish',
    value: function publish(queue, message) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.channelPool.channel(function (error, channel) {
          if (error) {
            reject(error);
          } else {
            var queueConfig = _this.config.queues[queue];

            var headers = {
              destination: queueConfig.name,
              'content-type': queueConfig.contentType
            };

            channel.send(headers, message, function (sendError) {
              if (sendError) {
                return reject(sendError);
              }

              return resolve();
            });
          }
        });
      });
    }
  }]);

  return MessagePublisher;
}();

exports.default = MessagePublisher;
module.exports = exports['default'];