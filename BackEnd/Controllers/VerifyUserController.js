
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const userModel = require("../Models/UsersModel");
const config = require("../config.json");


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
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing in Bloomsy Plants_Shop. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:7400/api/auth/register/confirm/${confirmationCode}> Click here</a>
          </div>`,
    };
    return mailOptions;
};
  

var verifyUser = async (req, res, next) => {
    userModel.findOne({
      confirmationCode: req.params.confirmationCode 
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
      try {
        jwt.verify(req.params.confirmationCode, config.SECRETKEY); // Verify the token isn't expired
        user.status = "Active";
        return user.save();
      } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }
    })
    .then(() => {
      return res.status(200).json({ message: "User Verified successfully." });
    })
    .catch((e) => res.status(401).json({ message: "Error occurs while verification." }));
};


module.exports = {verifyUser,sendVerificationEmail,prepareConfirmationMail,setVerificationToken};
