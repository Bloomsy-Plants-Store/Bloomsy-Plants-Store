const express = require("express");
const router = new express.Router();
const UserController = require("../Controllers/UserController");
const UserVerifyController = require("../Controllers/VerifyUserController");

// Register
router.post("/",UserController.Register)

// Forgot password
router.post("/forgot-password",UserController.forgetPassword)

// password reset
router.get('/reset-password/:token', UserController.displayResetPasswordForm);
router.post('/reset-password/:token', UserController.resetPassword);


// verify account
router.get("/confirm/:confirmationCode", UserVerifyController.verifyUser);

module.exports = router;

