const express = require("express");
const router = new express.Router();
const UserController = require("../Controllers/UserController");

// Register
router.post("/register",UserController.Register)

// Forgot password
router.post("/forgot-password",UserController.forgetPassword)

// password reset
router.get('/reset-password/:token', UserController.displayResetPasswordForm);
router.post('/reset-password/:token', UserController.resetPassword);

module.exports = router;

