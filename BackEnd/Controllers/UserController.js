const userModel = require("../Models/UsersModel");
const userValid = require("../Utils/AuthValidate");
const confirmation = require("./VerifyUserController");

var Register = async(req,res)=>{
    try{
        let foundedUser = await userModel.findOne({email:req.body.email}).exec();
        if(foundedUser) {
            return res.status(400).json({message:"User Already Exist"});
        }

        let user = new userModel({
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password: req.body.password
        })

        let valid = userValid(user);
        
       if(valid){
            await user.save()
            res.status(201).json({message:"User Added Successfully"});
        }else{
            res.status(400).json({message:"Not Compatible.."})
        } 
    }catch(err){
        console.log(err);
    }
};

module.exports = {Register};
