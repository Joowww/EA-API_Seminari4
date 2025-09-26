// src/config/swagger.ts
import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful con Node, Express, TypeScript y MongoDB',
      version: '1.0.0',
      description: 'RUTAS DE LA API PARA EL SWAGGER (Node + Express + TS + MongoDB)',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', 
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
