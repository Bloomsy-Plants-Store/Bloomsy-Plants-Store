const express = require("express");
const router = new express.Router();
const UserController = require("../Controllers/UserController");

router.post("/",UserController.Register)


module.exports = router;

