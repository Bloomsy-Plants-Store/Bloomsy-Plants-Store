const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config=require("../config.json");

const userModel = require("../Models/UsersModel");
const loginValid = require("../Utils/LoginValidate");

var Login = async(req,res)=>{
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

module.exports = {Login};