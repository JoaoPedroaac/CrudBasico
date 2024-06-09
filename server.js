const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./swagger');



const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb+srv://zegitajubile0:CPU8lNwdQwQNt9Kc@trabalho.h7railx.mongodb.net/?retryWrites=true&w=majority&appName=Trabalho';

/**
 * @swagger
 * components:
 *   schemas:
 *     Funcionario:
 *       type: object
 *       properties:
 *         Nome:
 *           type: string
 *           description: Nome do funcionário.
 *         Cargo:
 *           type: string
 *           description: Cargo do funcionário.
 *         Departamento:
 *           type: string
 *           description: Departamento do funcionário.
 *         Salario:
 *           type: number
 *           description: Salário do funcionário.
 */

/**
 * @swagger
 * tags:
 *   name: Funcionários
 *   description: Endpoints para gerenciamento de funcionários
 */


mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Conectado'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const funcionarioRoutes = require('./routes/Funcionarios');
app.use('/api/funcionarios', funcionarioRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


