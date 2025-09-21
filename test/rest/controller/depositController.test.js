// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require('../../../app');

// Mock
const walletService = require('../../../service/walletService');

let token;

describe('Deposit Controller', () => {
  describe('POST /wallet/deposit', () => {
    beforeEach(async () => {
      sinon.restore();
      // Registra o usuário antes do login
      await request(app)
        .post('/user/register')
        .send({
          username: 'hellen',
          password: '123456'
    });

      // Faz o login
      const respostaLogin = await request(app)
        .post('/user/login')
        .send({
          username: 'hellen',
          password: '123456'
        });
        token = respostaLogin.body.token;
    });

    it('Quando informo valor inválido recebo 400', async () => {
      const resposta = await request(app)
        .post('/wallet/deposit')
        .set('Authorization', `Bearer ${token}`)
        .send({ value: -10 });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Valor inválido');
    });

    it('Usando Mocks: Quando informo valor válido tenho sucesso com 200 OK', async () => {
      const walletServiceMock = sinon.stub(walletService, 'deposit').callsFake(() => ({
        success: true,
        message: 'Seu depósito foi feito com sucesso',
        saldo: 100
      }));
      const resposta = await request(app)
        .post('/wallet/deposit')
        .set('Authorization', `Bearer ${token}`)
        .send({ value: 100 });
      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.have.property('message', 'Seu depósito foi feito com sucesso');
      expect(resposta.body).to.have.property('saldo', 100);
    });
  });
});
