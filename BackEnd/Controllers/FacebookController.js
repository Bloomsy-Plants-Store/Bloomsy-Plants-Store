const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const userModel = require("../Models/UsersModel");
const config=require("../config.json");
const RandomPassword = require("../Utils/RandomPassword");

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
        // Check if the user already exists in the database
        let user = await userModel.findOne({ email: profile.emails[0].value }).exec();
        
        if (!user) {
          // User doesn't exist, create a new user
          user = new userModel({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: RandomPassword,
            phone: profile.phone || ""
          });

          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// Facebook login route
const loginWithFacebook = passport.authenticate("facebook", { scope: ["email"] });

// Facebook callback route
const loginWithFacebookCallback = passport.authenticate("facebook", {
  successRedirect: "/api/login/facebook/success",
  failureRedirect: "/api/login/facebook/failure",
});

module.exports = { loginWithFacebook, loginWithFacebookCallback };
