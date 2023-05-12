const userModel = require("../Models/UsersModel");
const config = require("../config.json");
const emailBody = require("../Utils/emailBodyBuilder");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

var forgetPassword = async(req,res)=>{
    try {

        let email = req.body.email;
        let user = await userModel.findOne({email:email}).exec();

        if (!user) {
          return res.status(404).json({ error: 'User Not Found' });
        }

        let resetToken = crypto.randomBytes(20).toString('hex');

        let resetTokenExpiration = Date.now() + 3600000; // 1 hour

        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();

        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: config.GMAIL_EMAIL,
            pass: config.GMAIL_PASS
          }
        });

        let mailOptions = {
          from: config.GMAIL_EMAIL,
          to: email,
          subject: 'Reset Password',
          html: emailBody.getResetPasswordEmailTemplate(user.name),
          };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset email sent',token: resetToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
   
}

var resetPassword = async(req,res)=>{
    try {
        let token  = req.body.token;
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

        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        return res.status(200).json({ message: 'Password reset successful' });
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = {forgetPassword,resetPassword};