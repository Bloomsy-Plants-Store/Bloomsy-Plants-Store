const express = require("express");
const router = new express.Router();
const UserController = require("../Controllers/UserController");
const ResetPasswordController = require("../Controllers/ResetPasswordController");
const UserVerifyController = require("../Controllers/VerifyUserController");

// Register
router.post("/",UserController.Register)

// Forgot password
router.post("/forgot-password", ResetPasswordController.forgetPassword)

// password reset
router.get('/reset-password/:token', ResetPasswordController.displayResetPasswordForm);
router.post('/reset-password/:token', ResetPasswordController.resetPassword);

// verify account
router.get("/confirm/:confirmationCode", UserVerifyController.verifyUser);

module.exports = router;

