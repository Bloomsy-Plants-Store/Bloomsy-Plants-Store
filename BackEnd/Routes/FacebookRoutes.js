const express = require("express");
const router = new express.Router();
const FacebookController = require("../Controllers/FacebookController");

// Route for initiating Facebook authentication
router.get("/", FacebookController.loginWithFacebook);

// Route for handling the Facebook callback
router.get("/callback", FacebookController.handleFacebookLoginCallback);

// Route for successful Facebook login
router.get("/success", (req, res) => {
  res.send("Logged in with Facebook successfully!");
});

// Route for failed Facebook login
router.get("/failure", (req, res) => {
  res.send("Failed to log in with Facebook!");
});

module.exports = router;
