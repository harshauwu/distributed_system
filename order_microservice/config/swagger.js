const swaggerJsDoc = require('swagger-jsdoc');
const { name, version } = require('../package.json');
const { port } = require('./config');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: name,
            version: version,
            description:
        'This is documentation for the Order API.<br><br> For every request you must include in the header: <br> <b>Content-Type: application/json</b> <br> <b>Authorization: Bearer <TOKEN></b> (Only for protected routes by authorization we use JWT.)<br>',
            termsOfService: 'http://swagger.io/terms/',
            contact: {
                email: 'harshauwu@gmail.com'
            },
            license: {
                name: 'Apache 2.0',
                url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
            },
            basePath: '/',
            schemes: ['http'],
            tags: [
                {
                    name: 'order-service',
                    description: 'Order Service'
                }
            ],
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: 'JWT Authentication Token'
                }
            },
            security: [{ JWT: [] }],
            defaultSecurity: 'basicAuth'
        },
        servers: [
            {
                url: `http://localhost:${port}/order-service/v1`,
                description: 'Local developmenet environment'
            },
            {
                url:'https://test1.com/dev/order-service/v1',
                description: 'Dev environment'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    // Paths to files containting OpenAPI definitions
    apis: ['./swagger/*.js', './routes/api/v1/*.routes.js']
};

module.exports = {
    spec: () => {
        return swaggerJsDoc(swaggerOptions);
    }
};
