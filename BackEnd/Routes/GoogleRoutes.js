const express = require("express");
const router = new express.Router();
const GoogleController = require("../Controllers/GoogleController");


router.get('/', GoogleController.LoginWithGoogle);
router.get('/callback', GoogleController.handleLoginWithGoogleCallback);

module.exports = router;
