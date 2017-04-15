'use strict';

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _Server = require('./Server');

var _Server2 = _interopRequireDefault(_Server);

var _logger = require('./util/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_config2.default.server.port = process.env.PORT || _config2.default.server.port;
var server = new _Server2.default(_config2.default);

server.start();
_logger2.default.info('Servidor iniciado na porta: ' + _config2.default.server.port);