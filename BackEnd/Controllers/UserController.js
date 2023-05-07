const bcrypt = require("bcrypt");
const userModel = require("../Models/UsersModel");
const userValid = require("../Utils/AuthValidate");

var Register = async(req,res)=>{
    try{
        let foundedUser = await userModel.findOne({email:req.body.email}).exec();
        if(foundedUser) {
            return res.status(400).send("User Already Exist");
        }

        var salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(req.body.password,salt);

        var user = new userModel({
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:hashedPassword
        })

        var valid = userValid(user);
        console.log(valid)
        
        if(valid){
            await user.save()
            res.status(201).send("User Added Successfully");
        }else{
            res.status(400).send("Not Compatible..")
        } 
    }catch(err){
        console.log(err);
    }
}


module.exports = {Register};