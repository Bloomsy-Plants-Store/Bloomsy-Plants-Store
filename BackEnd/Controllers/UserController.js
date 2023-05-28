const userModel = require("../Models/UsersModel");
const userValid = require("../Utils/AuthValidate");
const confirmation = require("./VerifyUserController");

var Register = async(req,res)=>{
    try{
        let foundedUser = await userModel.findOne({email:req.body.email}).exec();
        if(foundedUser) {
            return res.status(400).json({message:"User Already Exist"});
        }
        
        const confirmationToken = confirmation.setVerificationToken('48h',req.body.email); 

        let user = new userModel({
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password: req.body.password,
            confirmationCode: confirmationToken,
            status: "Pending",
            isAdmin: false
        })

        let valid = userValid(user);
        
       if(valid){
            await user.save();
            await confirmation.sendVerificationEmail(user.name,user.email,user.confirmationCode);
            res.status(201).json({message:"Verification Sent Successfully"});
        }else{
            res.status(400).json({message:"Not Compatible.."})
        } 
    }catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
};

module.exports = {Register};
