const express = require("express");
const router = new express.Router();
const ChatbotController = require("../Controllers/ChatbotController")

router.post('/message', ChatbotController.sendMessage)

module.exports = router;

