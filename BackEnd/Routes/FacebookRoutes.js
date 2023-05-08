const express = require("express");
const router = new express.Router();
const FacebookController = require("../Controllers/FacebookController");

// Route for initiating Facebook authentication
router.get("/", FacebookController.loginWithFacebook);

// Route for handling the Facebook callback
router.get("/callback", FacebookController.handleFacebookLoginCallback);

module.exports = router;
