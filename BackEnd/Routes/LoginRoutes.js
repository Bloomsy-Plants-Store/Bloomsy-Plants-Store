const express = require("express");
const router = new express.Router();
const LoginController = require("../Controllers/LoginController")

router.post("/", LoginController.Login)

// Route handler for successful Facebook login
router.get('/facebook/success', (req, res) => {
    // Handle successful login logic here
    res.send('Facebook login successful');
  });
  
  // Route handler for failed Facebook login
router.get('/facebook/failure', (req, res) => {
    // Handle failed login logic here
    res.send('Facebook login failed');
});

module.exports = router;
