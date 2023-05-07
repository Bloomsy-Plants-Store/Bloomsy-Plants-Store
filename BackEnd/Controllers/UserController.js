const bcrypt = require("bcrypt");
const userModel = require("../Models/UsersModel");


var Register = async(req,res)=>{
    try{
        let founduser = await userModel.findOne({email:req.body.email}).exec();
        if(founduser) return res.status(400).send("User Already Exist");
        var salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(req.body.password,salt);
        var user = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            phone:req.body.phone
        })
       // var valid = userValid(user);
        if(await user.save()){
            res.status(201).send("User Added Successfully");
        }else{
            res.status(400).send("Not Compatible..")
        } 
    }catch(err){
        console.log(err);
    }
}


module.exports = {Register};