const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // return the user to the frontend
            return done(null, user);
          }
          // return false since there is no user
          return done(null, false);
        })
        .catch(err => console.log(err));
    }));
  };


// token:BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmFjN2I1YjEwNTU3MTcwNDliNjBlNSIsImhhbmRsZSI6IidjYXNzJyIsImlhdCI6MTcwMTQ5ODMwMSwiZXhwIjoxNzAxNTAxOTAxfQ.BHYY3Rt9X9B2pA52bc1qLF-Fu27fspgTDTdakUGT920
