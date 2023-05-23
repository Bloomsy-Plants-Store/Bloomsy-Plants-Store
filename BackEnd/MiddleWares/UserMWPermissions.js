var jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = (req, res, next) => {
  var Token = req.header("x-auth-token");
  console.log(Token);
  if (!Token) return res.status(403).send("Access Denied...");
  try {
    if ( hasAdminRole(Token)) {
      next();
    } else {
      res.status(403).send("Forbidden Access...");
    }
  } catch (err) {
    res.status(400).send("Invalid Token...");
  }
};

 function hasAdminRole (userToken) {
  var decodePayload =  jwt.verify(userToken, config.SECRETKEY);
  console.log(decodePayload.adminRole)
  if (decodePayload.adminRole) {
    return true;
  } else {
    return false;
  }
}


