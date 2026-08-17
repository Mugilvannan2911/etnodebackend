const express = require('express');

const { getUsers, createUser } = require('../controllers/useController');

const router = express.Router();

router.get('/', getUsers);

router.post('/create', createUser);


module.exports = router;


