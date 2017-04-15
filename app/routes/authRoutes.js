import express from 'express';
var passport = require('passport');
import publisher from '../publisher';
import AuthController from '../controllers/AuthController';

export default () => {
  const router = express.Router();
  const controller = new AuthController();

  var OpenIDStrategy = require('passport-openid').Strategy;

  var SteamStrategy = new OpenIDStrategy({
        providerURL: 'http://steamcommunity.com/openid',
        stateless: true,
        returnURL: 'http://localhost:7000/auth/openid/return',
        realm: 'http://localhost:7000/',
    },
    function(identifier, done) {
        process.nextTick(function () {
            var user = {
                identifier: identifier,
                steamId: identifier.match(/\d+$/)[0]
            };

            return done(null, user);
        });
    });

  passport.use(SteamStrategy);

  passport.serializeUser(function(user, done) {
     done(null, user.identifier);
  });

  passport.deserializeUser(function(identifier, done) {
    done(null, {
        identifier: identifier,
        steamId: identifier.match(/\d+$/)[0]
    });
  });

  router.use(passport.initialize());
  router.use(passport.session()); 

  router.post('/openid', passport.authenticate('openid'));

  router.get('/openid/return', passport.authenticate('openid'),
    function(request, response) {
        if (request.user) {
            controller.persist(request.user.steamId);
            response.redirect('/?steamid=' + request.user.steamId);
        } else {
            response.redirect('/?failed');
        }
    });

  router.post('/logout', function(request, response) {
    request.logout();
    response.redirect(request.get('Referer') || '/')
  });

  return router;
};