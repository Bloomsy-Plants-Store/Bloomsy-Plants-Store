var jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = (req, res, next) => {
  var Token = req.header("x-auth-token");
  if (!Token) return res.status(403).json({ message: "Access Denied..." });
  try {
    if ( hasAdminRole(Token)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden Access..." });
    }
  } catch (err) {
    res.status(400).json({ message:"Invalid Token..."});
  }
};

 function hasAdminRole (userToken) {
  var decodePayload =  jwt.verify(userToken, config.SECRETKEY);
  if (decodePayload.adminRole) {
    return true;
  } else {
    return false;
  }
}


