const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Funcionários',
      version: '1.0.0',
      description: 'API para gerenciamento de funcionários',
      contact: {
        name: 'João Pedro Andrade',
      },
      servers: [
        {
          url: 'https://crudbasico-k87c.onrender.com',
          description: 'Servidor da API',
        },
      ],
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
