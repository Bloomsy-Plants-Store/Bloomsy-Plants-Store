const express = require("express");
const router = new express.Router();
const TwitterController = require("../Controllers/TwitterController");

// Route for initiating Twitter authentication
router.get("/", TwitterController.loginWithTwitter);

// Route for handling the Twitter callback
router.get("/callback", TwitterController.handleTwitterLoginCallback);


module.exports = router;
