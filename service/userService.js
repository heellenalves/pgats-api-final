const { users } = require('../model/userModel');
const bcrypt = require('bcryptjs');

function registerUser(username, password) {
  if (users.find(u => u.username === username)) {
    return { error: 'Usuário já existe' };
  }
  const hashed = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashed });
  return { success: true };
}

function validateUser(username, password) {
  const user = users.find(u => u.username === username);
  if (!user) return false;
  return bcrypt.compareSync(password, user.password);
}

module.exports = { registerUser, validateUser };
