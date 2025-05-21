const express = require('express');
const userController = require('../controllers/user');
const { verify } = require('../auth');

const router = express.Router();

// Register User
router.post('/register', userController.registerUser);

// Login User
router.post('/login', userController.loginUser);

// Get User Details
router.get('/details', verify, userController.getUserDetails);

module.exports = router;