const express = require("express");
const router = new express.Router();
const LoginController = require("../Controllers/LoginController")

router.post("/", LoginController.Login)

module.exports = router;
