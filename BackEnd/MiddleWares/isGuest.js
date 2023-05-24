var jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = (req, res, next) => {
  var Token = req.header("x-auth-token");
  try {
    if (Token) {
      next();
    } else {
        res.status(403).json({ message: "Forbidden Access..." });
        res.redirect("/api/auth/login");
    }
  } catch (err) {
      res.status(400).json({ message: "Invalid Token..." });
      res.redirect("/api/auth/login");
  }
};

