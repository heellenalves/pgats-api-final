const { wallets } = require('../model/walletModel');

function deposit(username, value) {
  if (typeof value !== 'number' || isNaN(value)) return { error: 'Valor deve ser um número' };
  if (value <= 0) return { error: 'Valor inválido' };
  if (!wallets[username]) wallets[username] = 0;
  wallets[username] += value;
  return {
    success: true,
    message: `Seu depósito foi feito com sucesso`,
    saldo: wallets[username]
  };
}


function resetBalance(username) {
  wallets[username] = 0;
}

function getBalance(username) {
  const saldo = wallets[username] || 0;
  return {
    message: `Seu saldo atual: ${saldo}`
  };
}

module.exports = { deposit, getBalance, resetBalance };
