const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const passport = require('passport');
const User = require("../Models/UsersModel");
const getRememberMeToken = require("../Utils/rememberMeToken");
const RememberMeStrategy = require('passport-remember-me').Strategy;


var Login = async (req, res) => {
  //Check Email
  var user = await User.findOne({ email: req.body.email }).exec();
  if (!user) return res.status(400).json({ message: 'Invalid Email Or Password' });
  if(user.status != "Active") return res.status(401).json({message: "Pending Account. Please Verify Your Email!"});
  
  //Check Password
  var checkpass = await bcrypt.compare(req.body.password, user.password);
  if (!checkpass) return res.status(400).json({ message: 'Invalid Email Or Password' });

  return passport.authenticate('local', { failureRedirect: '/login' })
    (req, res, async () => {
      if (req.body.rememberMe) {
        if (!user.rememberMeToken) {
          const token = await getRememberMeToken;
          res.header({ "remember_me": token });
          await User.updateOne({ email: req.body.email }, { $set: { rememberMeToken: token } });
          // res.cookie('remember_me', token, { maxAge: 604800000 }); // Expires after 7 days
        }
      }
      //Login
      var Token = jwt.sign({ UserId: user._id, UserName: user.name, adminRole: user.isAdmin }, config.SECRETKEY);
      res.header({ "x-auth-token": Token });
    res.status(200).json({ message: "Logged In Successfully!" });
    });


}

module.exports = { Login };


