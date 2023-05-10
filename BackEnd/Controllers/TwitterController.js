const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const userModel = require("../Models/UsersModel");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomPass = require('../Utils/RandomPassword');

const loginWithTwitter = passport.authenticate('twitter', { includeEmail: true }); //Use the passport.authenticate middleware with the 'twitter' strategy to handle authentication requests.

passport.use(new TwitterStrategy({
    consumerKey: config.TWITTER_APP_KEY,
    consumerSecret: config.TWITTER_SECRET_KEY,
    callbackURL: config.TWITTER_CALLBACK_URL,
    includeEmail: true,
},
    async function (token, tokenSecret, profile, done) {
        // save the user data to your database and call the "done" function to authenticate the user
        try { 
            let user=await userModel.findOne({ email: profile.emails[0].value }).exec(); 
            if (!user) {

                // User doesn't exist, create a new user
                user = new userModel({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  password: randomPass,
                  phone: profile.phone || ""
                });
                await user.save();
              }
            done(null, {user});
        }
        catch (err) {
            done(err);
         }
    }
));

const handleTwitterLoginCallback = (req, res) => {
    passport.authenticate("twitter", (err, user, info) => {
      if (err) {
        return res.status(500).send("An error occurred when login with Twitter!");
      }
      if (!user) {
        return res.status(401).send("Twitter login failed");
      }
  
      // Successful login, generate token and include it in the response header
      const token = jwt.sign({ userId: user._id }, config.SECRETKEY);
      res.header("x-auth-token", token);
      res.status(200).send("Twitter login successful");
    })(req, res);
  };
  

module.exports = { loginWithTwitter, handleTwitterLoginCallback};
