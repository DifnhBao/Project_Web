const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//route for register
router.post('/register', authController.register);


//route for login
router.post('/login', authController.login);


module.exports = router;