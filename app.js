const express = require('express');
const logger = require('morgan');
const config = require('config');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const debug = require('debug')('Nodepop:App');
const api = require('./routes/api');
const errorResponses = require('./lib/errorResponses');
const swaggerDocument = require('./docs/swagger.json');

const app = express();

app.use(logger(config.get('logger.format')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('404');
  err.status = 404;
  return next(err);
});

app.use((err, req, res, next) => { // eslint-disable-line
  debug(err.stack);
  const { status, error } = errorResponses(err.message);
  return res.status(status).json({
    success: false,
    error,
  });
});

module.exports = app;
