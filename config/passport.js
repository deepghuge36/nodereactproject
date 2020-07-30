const jwt = require('passport-jwt').Strategy;
const Extract = require('passport-jwt').ExtractJwt;
const User = require('../Models/Users');

const Keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = Extract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Keys.secretOrKey;

module.exports = (passport) => passport.use(
  new jwt(opts, (jwt_payload, done) => User.findById(jwt_payload.id)
    .then((user) => {
      return user ? done(null, user) : done(null, false);
    })
    .catch((err) => console.log(err)))
);