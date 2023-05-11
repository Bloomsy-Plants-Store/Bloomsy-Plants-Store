const express = require("express");
const router = new express.Router();
const LogoutController = require("../Controllers/LogoutController")

router.get("/", LogoutController.Logout);

module.exports = router;

  