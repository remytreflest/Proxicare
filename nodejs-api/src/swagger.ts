import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Proxicare API',
    version: '1.0.0',
    description: 'Documentation de l’API Proxicare',
  },
  servers: [
    {
      url: 'http://193.168.145.61:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./Controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app : Express) => {
  app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
