const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const userModel = require("../Models/UsersModel");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomPass = require('../Utils/RandomPassword');

passport.use(
  new FacebookStrategy(
    {
      clientID: config.FB_APP_KEY,
      clientSecret: config.FB_SECRET_KEY,
      callbackURL: config.FB_CALLBACK_URL,
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ email: profile.emails[0].value }).exec();
        if (!user) {
          // User doesn't exist, create a new user
          user = new userModel({
            name: profile.name.givenName + " " + profile.name.middleName,
            email: profile.emails[0].value,
            password: randomPass,
            phone: profile.phone || ""
          });
          await user.save();
        }
        done(null, {user});
      } catch (err) {
        done(err);
      }
    }
  )
);

const loginWithFacebook = passport.authenticate("facebook", { scope: ["email"] });

const handleFacebookLoginCallback = (req, res) => {
  passport.authenticate("facebook", (err, user, info) => {
    if (err) {
      return res.status(500).send("An error occurred when loggin with facebook!");
    }
    if (!user) {
      return res.status(401).send("Facebook login failed");
    }

    // Successful login, generate token and include it in the response header
    const token = jwt.sign({ userId: user._id }, config.SECRETKEY);
    res.header("x-auth-token", token);
    res.status(200).send("Facebook login successful");
  })(req, res);
};

module.exports = { loginWithFacebook, handleFacebookLoginCallback };
