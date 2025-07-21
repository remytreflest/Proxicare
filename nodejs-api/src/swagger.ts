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
  tags: [
  {
    name: 'QR Code',
    description: 'Génération et validation de soins via QR code'
  },
  {
    name: 'Register',
    description: 'Enregistrement de l\'utilisateur'
  },
  {
    name: 'Prescriptions',
    description: 'Gestion des prescriptions'
  },
  {
    name: 'Healthcare Acts',
    description: 'Gestion des actes de soins'
  }
]
};

const options = {
  swaggerDefinition,
  apis: ['./src/Controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app : Express) => {
  app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
