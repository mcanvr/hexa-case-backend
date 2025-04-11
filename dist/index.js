"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const errorHandler_1 = require("./middleware/errorHandler"); // Import error handler
const logo_routes_1 = __importDefault(require("./routes/logo.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3002;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Generated Logos API',
            version: '1.0.0',
            description: 'API for managing generated logos using a structured architecture',
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use('/api/v1', logo_routes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
