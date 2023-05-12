
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const userModel = require("../Models/UsersModel");
const config = require("../config.json");
const emailBody = require("../Utils/emailBodyBuilder");
const emailResponse = require("../Utils/responseEmail");


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


var sendVerificationResponseEmail = async (username) => {
    let confirmationEmail= prepareResponseEmail(username);
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

var prepareResponseEmail = (name,email)=>{
    let mailOptions = {
        from: config.GMAIL_EMAIL,
        to: email,
        subject: "Account is Verified",
        html: emailBody.emailResponse(name),
      };
      return mailOptions;
}
  

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
        return user.save();
      } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }
    })
    .then(() => {
      // sendVerificationResponseEmail(req.params.name,req.params.email); 
      res.header({"confirmation-token": req.params.confirmationCode  });
      return res.status(200).json({ message: "User Verified successfully." });
    })
    .catch((e) => res.status(401).json({ message: "Error occurs while verification" }));
};


module.exports = {verifyUser,sendVerificationEmail,prepareConfirmationMail,setVerificationToken};
