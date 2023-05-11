
const userModel = require("../Models/UsersModel");
const config = require("../config.json");


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
        user.status = "Active";
        return user.save(); 
      })
      .then(()=>{
        return res.status(200).json({ message: "User Verified successfully." });
      })
      .catch((e) => console.log("error", e));
  }; 


module.exports = {verifyUser,prepareConfirmationMail};
