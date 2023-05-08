const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config=require("../config.json");

const userModel = require("../Models/UsersModel");
const loginValid = require("../Utils/LoginValidate");

var Login = async(req,res)=>{
    // return passport.authenticate('local', { failureRedirect: '/login' })(req, res, async () => {
    //     if (req.body.rememberMe) {
    //       const token = await req.user.generateRememberMeToken();
    //       await User.updateOne({ _id: req.user._id }, { $set: { rememberMeToken: token } });
    //       res.cookie('remember_me', token, { maxAge: 604800000 }); // Expires after 7 days
    //     }else{
            //Check Email
            var user = await userModel.findOne({email:req.body.email}).exec();
            if(!user) return res.status(400).send("Invalid Email Or Password")

            //Check Password
            var checkpass = await bcrypt.compare(req.body.password, user.password);
            if(!checkpass) return res.status(400).send("Invalid Email Or Password")

            //Login
            var Token = jwt.sign({UserId:user._id},config.SECRETKEY)
            res.header("x-auth-token",Token);
            res.status(200).send("Logged In Successfully!")
        }
    
    //   });
    
// }

module.exports = {Login};
