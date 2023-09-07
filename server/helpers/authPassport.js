const passport = require('passport');
const passportJWT = require('passport-jwt');

const User=require("../models/users/user");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwtSecret = process.env.JWT_SECRET

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
  }, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));

  module.exports=passport;