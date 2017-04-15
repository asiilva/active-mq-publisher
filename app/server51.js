var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

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

app.use(passport.initialize());
app.use(passport.session());

app.post('/auth/openid', passport.authenticate('openid'));

app.get('/auth/openid/return', passport.authenticate('openid'),
    function(request, response) {
        if (request.user) {
            response.redirect('/?steamid=' + request.user.steamId);
        } else {
            response.redirect('/?failed');
        }
});

app.post('/auth/logout', function(request, response) {
    request.logout();
    response.redirect(request.get('Referer') || '/')
});

var port = 4000;
var server = app.listen(port);
console.log('Listening on port ' + port);