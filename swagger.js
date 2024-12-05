// swagger
const { version } = require('eslint-plugin-prettier');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion de la API', // Titulo de la documentación
    version: '1.0.0', // Version de la API
    description: 'Documentacion de la API con Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000', // URL base de la API
      description: 'Servidor de Desarrollo',
    },
  ],
  tags: [
    {
      name: 'Areas',
      description: 'Endpoints para areas',
    },
    {
      name: 'Departamentos',
      description: 'Endpoints para departamentos',
    },
    {
      name: 'Empleados',
      description: 'Endpoints para empleados',
    },
    {
      name: 'Encargados',
      description: 'Endpoints para encargados',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Acceso a todas las rutas de los archivos definidos
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
