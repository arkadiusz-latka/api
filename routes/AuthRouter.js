const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const authGuard = require('../middleware/auth.middleware');

router.post('/signIn', AuthController.signIn);
router.post('/signUp', AuthController.signUp);
router.get('/user', authGuard, AuthController.user);

module.exports = router;