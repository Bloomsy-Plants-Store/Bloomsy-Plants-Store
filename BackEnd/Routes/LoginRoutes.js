const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../Models/UsersModel");
const loginValid = require("../Utils/LoginValidate");

router.post("/",async(req,res)=>{

    //Check Email
    var user = await userModel.findOne({email:req.body.email}).exec();
    if(!user) return res.status(400).send("Invalid Email Or Password")
    
    //Check Password
    var checkpass = await bcrypt.compare(req.body.password, user.password).exec();
    if(!checkpass) return res.status(400).send("Invalid Email Or Password")
    
    //Login
    var Token = jwt.sign({UserId:user._id},"thisistokensecret")
    res.header("x-auth-token",Token);
    res.status(200).send("Logged In Successfully!")

})

module.exports = router;
