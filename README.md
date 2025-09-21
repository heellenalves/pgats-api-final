# API - Cofrinho digital

Esta API permite registro, login, depósito e consulta de saldo em um cofrinho digital. O objetivo é servir de base para estudos de testes e automação de APIs.

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install express jsonwebtoken bcryptjs swagger-ui-express
   ```

## Como rodar

- Para iniciar o servidor:
  ```bash
  node server.js
  ```
- Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais

- `POST /user/register` — Registro de usuário (username, senha)
- `POST /user/login` — Login (retorna JWT)
- `POST /wallet/deposit` — Depósito (JWT obrigatório)
- `GET /wallet/balance` — Consulta de saldo (JWT obrigatório)

## Observações
- O banco de dados é em memória, reinicia ao parar o servidor.
- Não é permitido registrar usuários duplicados.
- Não é permitido depositar valores negativos.

## Testes
- O arquivo `app.js` pode ser importado para testes automatizados (ex: Supertest).

---

API desenvolvida para fins educacionais.
