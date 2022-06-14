const express = require("express");
const UserController = require("./users.controller");

const router = express.Router();

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

module.exports = router;