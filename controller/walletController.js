const express = require('express');
const router = express.Router();
const { deposit, getBalance } = require('../service/walletService');

router.post('/deposit', (req, res) => {
  const { value } = req.body;
  const username = req.user.username;
  const result = deposit(username, value);
  if (result.error) return res.status(400).json({ error: result.error });
  res.json({ success: result.success, message: result.message, saldo: result.saldo });
});


router.get('/balance', (req, res) => {
  const username = req.user.username;
  const result = getBalance(username);
  res.json(result);
});

module.exports = router;
