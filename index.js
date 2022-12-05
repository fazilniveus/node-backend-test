/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const swaggerTools = require('swagger-tools');
const cors = require('cors');
const YAML = require('yamljs');

// security issues
const helmet = require('helmet');
require('dotenv').config();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self' 'unsafe-inline'"],
  },
}));


const auth = require('../node-backend-common/utils/auth');
const logger = require('../node-backend-common/utils/logger');

const swaggerConfig = YAML.load('./api/swagger.yaml');

module.exports = app;
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

const serverPort = 7001;

// development protocol https
if (process.env.NODE_ENV === 'development') {
  swaggerConfig.schemes = ['http'];
}

// swaggerRouter configuration
const options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './api/controllers'),
  useStubs: true, // Conditionally turn on stubs (mock mode)
};


// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerConfig, (middleware) => {
  // Interpret Swagger resources and attach
  // metadata to request - must be first in swagger-tools middleware chain
  app.use('/', middleware.swaggerMetadata());

  app.use(
    middleware.swaggerSecurity({
      // manage token function in the 'auth' module
      Bearer: auth.verifyToken,
    }),
  );

  // Validate Swagger requests
  app.use('/', middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use('/', middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
  app.use('/admin/api', middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, () => {
    logger.debug(`Your server is listening on port ${serverPort} (http://localhost:${serverPort})`);
    logger.debug(`Swagger-ui is available on http://localhost:${serverPort}/docs`);
  });
});
