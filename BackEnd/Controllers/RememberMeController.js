const passport = require('passport');
const RememberMeStrategy = require('passport-remember-me').Strategy;
const User = require('../Models/UsersModel');

passport.use(new RememberMeStrategy(
  async (token, done) => {
    const user = await User.findOne({ rememberMeToken: token });

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  },
  async (user, done) => {
    const token = await user.generateRememberMeToken();
    await User.updateOne({ _id: user._id }, { $set: { rememberMeToken: token } });
    return done(null, token);
  }
));