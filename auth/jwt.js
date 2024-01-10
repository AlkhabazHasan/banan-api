const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

// console.log(ExtractJwt.fromAuthHeaderWithScheme('authorization'))

// JWT strategy options
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('authorization'),
  secretOrKey: `${process.env.JWT_SECRET}`,
};

// JWT strategy
const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  console.log("you are here")
  
  try {
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// Use strategies
passport.use(jwtStrategy);

// Export authentication middleware
exports.authJwt = passport.authenticate("jwt", {
  session: false,
});
