const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

exports.initSwaggerConfig = (app)=> {
    /* var options = {
        url: 'http://petstore.swagger.io/v2/swagger.json'
      }; */
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};