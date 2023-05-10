const passport = require('passport');
const config = require("../config.json");
const userModel = require("../Models/UsersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomPass = require('../Utils/RandomPassword');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_APP_KEY,
    clientSecret: config.GOOGLE_SECRET_KEY,
    callbackURL: config.GOOGLE_CALLBACK_URL,
    includeName: true,
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile.emails[0].value }).exec();
            if (!user) {
                const salt = await bcrypt.genSalt(10);
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
        } catch (err) {
            consloe.log(err)
            done(err);
        }
}
));

const LoginWithGoogle = passport.authenticate('google', { scope:  ['profile', 'email']  });


const handleLoginWithGoogleCallback = (req, res) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) {
            return res.status(500).json({  error: 'An error occurred when loggin with google!'});
        }
        if (!user) {
            return res.status(401).json({ error: 'Google login failed' });
        }
        // Successful login, generate token and include it in the response header
        const token = jwt.sign({ userId: user._id }, config.SECRETKEY);
        res.header('x-auth-token', token);
        res.status(200).json({ message  : 'Google login successful'});
    })(req, res);
};
 
module.exports = { LoginWithGoogle, handleLoginWithGoogleCallback };