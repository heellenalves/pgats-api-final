// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude').default || require('chai-exclude');
use(chaiExclude);
require('dotenv').config();
const walletService = require('../../../service/walletService');

let token;

describe('Deposit External', () => {
  describe('POST /wallet/deposit', () => {
    before(async () => {
      // Registra o usuário antes do login
      await request(process.env.BASE_URL_REST)
        .post('/user/register')
        .send({
          username: 'hellen_external_test',
          password: '123456'
        });

      // Faz o login
      const respostaLogin = await request(process.env.BASE_URL_REST)
        .post('/user/login')
        .send({
          username: 'hellen_external_test',
          password: '123456'
        });
      token = respostaLogin.body.token;
    });

    beforeEach(async () => {
      sinon.restore();
      await walletService.resetBalance('hellen_external_test');
    });

    it('Quando informo valor válido, tenho sucesso com 200 OK', async () => {
      const postDeposit = require('../fixture/requisicoes/depositos/postDeposit.json');
      const resposta = await request(process.env.BASE_URL_REST)
        .post('/wallet/deposit')
        .set('Authorization', `Bearer ${token}`)
        .send(postDeposit);
      expect(resposta.status).to.equal(200);

      const respostaEsperada = require('../fixture/respostas/quandoInformoUmValorValidoTenhoUm200NoDeposito.json');
      expect(resposta.body)
        .excluding('saldo')
        .to.deep.equal(respostaEsperada);
    });

    const testesDeErrosDeNegocio = require('../fixture/requisicoes/depositos/postDepositWithErrors.json');
    testesDeErrosDeNegocio.forEach(teste => {
      it(`Testando a regra relacionada a ${teste.nomeDoTeste}`, async () => {
        const resposta = await request(process.env.BASE_URL_REST)
          .post('/wallet/deposit')
          .set('Authorization', `Bearer ${token}`)
          .send(teste.postDeposit);
        expect(resposta.status).to.equal(teste.statusCode);
        expect(resposta.body).to.have.property('error', teste.mensagemEsperada);
      });
    });
  });
});
