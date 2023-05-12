const User = require("../Models/UsersModel");

var Logout = async (req, res) => {
     await req.session.destroy(async (err) => {
      if(err) {
        res.status(400).json({message:'Failed to LogOut'})
      } else {
        await User.updateOne({ _id : req.body.id }, { $set: { rememberMeToken: null } });
        res.status(200).json({message:'LogOut Successfully'})
      }
    });
  };

module.exports = {Logout}