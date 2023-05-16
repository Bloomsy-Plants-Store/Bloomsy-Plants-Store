const express = require("express");
const router = new express.Router();
const UserController = require("../Controllers/UserController");
const ResetPasswordController = require("../Controllers/ResetPasswordController");
const UserVerifyController = require("../Controllers/VerifyUserController");

// Register
router.post("/",UserController.Register)

// Forgot password
router.post("/forgot-password", ResetPasswordController.forgetPassword)

// Reset Password
router.post('/reset-password', ResetPasswordController.resetPassword);

// Verify Account
router.get("/confirm/:confirmationCode", UserVerifyController.verifyUser);





module.exports = router;

