const express = require('express');
const router = express.Router();
const { registerUser, validateUser } = require('../service/userService');
const { generateToken } = require('../middleware/authenticateToken');

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ success: false, message: 'Username e senha obrigatórios' });
  const result = registerUser(username, password);
  if (result.error) return res.status(409).json({ success: false, message: result.error });
  res.status(201).json({ success: true, message: 'Usuário registrado com sucesso' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ success: false, message: 'Username e senha obrigatórios' });
  if (!validateUser(username, password)) return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  const token = generateToken(username);
  res.json({ success: true, token });
});

module.exports = router;
