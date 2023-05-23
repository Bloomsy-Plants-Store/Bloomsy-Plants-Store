var jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = async (req, res, next) => {
  var Token = req.header("x-auth-token");
  console.log(Token);
  if (!Token) return res.status(400).send("Access Denied...");
  try {
    if (await hasAdminRole(Token)) {
      next();
    } else {
      res.status(400).send("Forbidden Access...");
    }
  } catch (err) {
    res.status(400).send("Invalid Token...");
  }
};

async function hasAdminRole (userToken) {
  var decodePayload = await jwt.verify(userToken, config.SECRETKEY);
  if (decodePayload.adminRole) {
    return true;
  } else {
    return false;
  }
}


