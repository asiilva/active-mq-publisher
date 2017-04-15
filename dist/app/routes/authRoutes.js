'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _publisher = require('../publisher');

var _publisher2 = _interopRequireDefault(_publisher);

var _AuthController = require('../controllers/AuthController');

var _AuthController2 = _interopRequireDefault(_AuthController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require('passport');

exports.default = function () {
  var router = _express2.default.Router();
  var controller = new _AuthController2.default();

  var OpenIDStrategy = require('passport-openid').Strategy;

  var SteamStrategy = new OpenIDStrategy({
    providerURL: 'http://steamcommunity.com/openid',
    stateless: true,
    returnURL: 'http://localhost:7000/auth/openid/return',
    realm: 'http://localhost:7000/'
  }, function (identifier, done) {
    process.nextTick(function () {
      var user = {
        identifier: identifier,
        steamId: identifier.match(/\d+$/)[0]
      };

      return done(null, user);
    });
  });

  passport.use(SteamStrategy);

  passport.serializeUser(function (user, done) {
    done(null, user.identifier);
  });

  passport.deserializeUser(function (identifier, done) {
    done(null, {
      identifier: identifier,
      steamId: identifier.match(/\d+$/)[0]
    });
  });

  router.use(passport.initialize());
  router.use(passport.session());

  router.post('/openid', passport.authenticate('openid'));

  router.get('/openid/return', passport.authenticate('openid'), function (request, response) {
    if (request.user) {
      controller.persist(request.user.steamId);
      response.redirect('/?steamid=' + request.user.steamId);
    } else {
      response.redirect('/?failed');
    }
  });

  router.post('/logout', function (request, response) {
    request.logout();
    response.redirect(request.get('Referer') || '/');
  });

  return router;
};

module.exports = exports['default'];