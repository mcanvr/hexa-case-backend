import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import cors from 'cors';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/errorHandler'; // Import error handler
import logoRoutes from './routes/logo.routes';

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Generated Logos API',
      version: '1.0.0',
      description:
        'API for managing generated logos using a structured architecture',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1',
      },
    ],
    components: {
      schemas: {
        Timestamp: {
          type: 'object',
          properties: {
            seconds: {
              type: 'integer',
              format: 'int64',
              description: 'Unix timestamp seconds',
            },
            nanoseconds: {
              type: 'integer',
              description: 'Nanoseconds part of the timestamp',
            },
          },
          description: 'Firestore Timestamp',
        },
        GeneratedLogo: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The document ID.',
            },
            prompt: {
              type: 'string',
            },
            logo_style: {
              type: 'string',
            },
            image_url: {
              type: 'string',
            },
            created_at: {
              $ref: '#/components/schemas/Timestamp',
            },
          },
        },
        CreateLogoInput: {
          type: 'object',
          required: ['prompt', 'logo_style', 'image_url'],
          properties: {
            prompt: {
              type: 'string',
              description: 'The prompt used to generate the logo.',
            },
            logo_style: {
              type: 'string',
              description: 'The style of the logo (e.g., monogram, abstract).',
            },
            image_url: {
              type: 'string',
              description: 'URL of the generated logo image.',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1', logoRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
