const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../midlewares/auth.midleware');

//route for register
router.post('/register', authController.register);


//route for login
router.post('/login', authController.login);

//route for refresh token
router.post(
    '/refresh-token',
    authController.requestRefreshToken
);

//route for log out
router.post(
    '/logout',
    protect,
    authController.logout
)

module.exports = router;