const passport = require('passport');
const RememberMeStrategy = require('passport-remember-me').Strategy;
const User = require('../Models/UsersModel');
const rememberMeToken = require("../Utils/rememberMeToken");

passport.use(new RememberMeStrategy(
  
  async (token, done) => {
    const user = await User.findOne({ rememberMeToken: token });

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  },
  async (user, done) => {
    const token = await user.rememberMeToken;
    await User.updateOne({ email: req.body.email }, { $set: { rememberMeToken: token } });
    return done(null, token);
  }
));
// module.exports = {}