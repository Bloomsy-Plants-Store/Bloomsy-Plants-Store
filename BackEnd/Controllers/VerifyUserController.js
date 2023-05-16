const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const userModel = require("../Models/UsersModel");
const config = require("../config.json");
const emailBody = require("../Utils/emailBodyBuilder");


const setVerificationToken = (expireDate,email)=>{
    const expiresIn = expireDate; 
    const confirmationToken = jwt.sign({ email: email }, config.SECRETKEY, { expiresIn });
    return confirmationToken;
}

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.GMAIL_EMAIL,
    pass: config.GMAIL_PASS
  }
});

var sendVerificationEmail = async (username,email,code) => {
    let confirmationEmail= prepareConfirmationMail(username,email,code);
    transport.sendMail(confirmationEmail);
}

var prepareConfirmationMail = (name, email, confirmationCode) => {
    let mailOptions = {
      from: config.GMAIL_EMAIL,
      to: email,
      subject: "Please confirm your account",
      html: emailBody.getEmailTemplate(name,confirmationCode),
    };
    return mailOptions;
};

var verifyUser = async (req, res, next) => {
    userModel.findOne({
      confirmationCode: req.params.confirmationCode 
    })
    .then((user) => {
      if (!user) {
        return res.status(404).jspn({ message: "User Not found"});
      }
      try {
        jwt.verify(req.params.confirmationCode, config.SECRETKEY); 
        user.status = "Active";
        console.log(user);
        return user.save();
      } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }
    })
    .then(() => {
       res.redirect(config.FRONTEND_URL+'login');
    })
    .catch((e) => res.status(401).json({ message: "Error occurs while verification" }));
};

module.exports = {verifyUser,sendVerificationEmail,prepareConfirmationMail,setVerificationToken};
