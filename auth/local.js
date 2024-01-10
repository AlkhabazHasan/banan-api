// Import required modules
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// Local strategy options
const localOpts = {
  usernameField: "email",
};

// Local strategy
const localStrategy = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user || !user.authenticateUser(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }
);

// Use strategies
passport.use(localStrategy);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Export authentication middleware
exports.authLocal = passport.authenticate("local", {
  failureRedirect: '/failure', 
  successRedirect: '/',
  session: false,
});
