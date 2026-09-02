const express = require('express');

const authMiddleware = require("../middleware/authMiddleware");

const { getUsers, createUser } = require('../controllers/useController');

const router = express.Router();

router.get('/', getUsers);

router.post('/create', authMiddleware, createUser);

module.exports = router;