const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controller/userController');
const walletController = require('./controller/walletController');
const { authenticateToken } = require('./middleware/authenticateToken');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', userController);
app.use('/wallet', authenticateToken, walletController);

module.exports = app;
