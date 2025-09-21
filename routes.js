const express = require('express');
const userController = require('./controller/userController');
const walletController = require('./controller/walletController');

const router = express.Router();

router.use('/users', userController);
router.use('/wallet', walletController);

module.exports = router;
