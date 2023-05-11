
const userModel = require("../Models/UsersModel");
const userValid = require("../Utils/AuthValidate");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const confirmation = require("./VerifyUserController");


var Register = async(req,res)=>{
    try{
        let foundedUser = await userModel.findOne({email:req.body.email}).exec();
        if(foundedUser) {
            return res.status(400).json({message:"User Already Exist"});
        }
        
        const confirmationToken = confirmation.setVerificationToken('48h',req.body.email); //email verification token which expires in 48 hours

        let user = new userModel({
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password: req.body.password,
            confirmationCode: confirmationToken,
            status:"Pending"
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
        console.log(err);
    }
}

var forgetPassword = async(req,res)=>{
    try {

        let email = req.body.email;
        let user = await userModel.findOne({email:email}).exec();

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        let resetToken = crypto.randomBytes(20).toString('hex');

        let resetTokenExpiration = Date.now() + 3600000; // 1 hour


        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();

        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'omnia.goher9@gmail.com',
            pass: 'srljpnmjsbnmedfc'
          }
        });

        let mailOptions = {
          from: 'omnia.goher9@gmail.com',
          to: email,
          subject: 'Password Reset Request',
          text: `Please click the following link to reset your password: http://localhost:7400/api/auth/register/reset-password/${resetToken} ` 
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset email sent' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}


var displayResetPasswordForm = async(req,res)=>{
    try {
        let { token } = req.params;
        let user = await userModel.findOne({
          resetToken: token,
          resetTokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
          return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        return res.status(200).json({ message: 'password reset token', token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

var resetPassword = async(req,res)=>{
    try {
        let { token } = req.params;
        let password = req.body.password;
        let user = await userModel.findOne({
          resetToken: token,
          resetTokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
          return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        let checkPassword = passwordPattern.test(password)
        if (!checkPassword) {
            return res.status(400).json({ error: 'Not Compatible..' });
        }
        // let hashedPassword = await bcrypt.hash(password, 10);
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        return res.status(200).json({ message: 'Password reset successful' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}









module.exports = {Register,forgetPassword,resetPassword,displayResetPasswordForm};