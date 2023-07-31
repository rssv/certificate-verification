const express = require('express');

const authControllers = require('../controllers/auth');

const router = express.Router();

router.post('/login', authControllers.loginHandler);

router.post('/token', authControllers.refreshTokenHandler);

router.delete('/logout', authControllers.logoutHandler);

module.exports = router;
