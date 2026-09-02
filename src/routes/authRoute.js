const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const { loginUser, registerUser } = require("../controllers/authController");

const router = express.Router();

router.post('/login', authMiddleware, loginUser);

router.post('/register', authMiddleware, registerUser);

module.exports = router;