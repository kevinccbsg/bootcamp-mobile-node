require('dotenv').config();
const path = require('path');
const express = require('express');
const logger = require('morgan');
const config = require('config');
const bodyParser = require('body-parser');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const i18n = require('i18n');
const debug = require('debug')('Nodepop:App');
const api = require('./routes/api');
const errorResponses = require('./lib/errorResponses');

i18n.configure({
  locales: ['en', 'es'],
  api: {
    __: 't',
  },
  directory: path.join(__dirname, 'locales'),
});

const app = express();

app.use(logger(config.get('logger.format')));
app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
expressJSDocSwagger(app)(config.get('router.swaggerOptions'));

app.get('/', (req, res) => {
  debug('Index routes');
  return res.status(200).send(`
    <div>
      <h1>Nodepop API</h1>
      <h4>${req.t('routes')}</h4>
      <ul>
        <li>
          <a href="/api-docs">/api-docs</a>
        </li>
        <li>
          <a href="/api/v1/user/register">/api/v1/register</a>
        </li>
        <li>
          <a href="/api/v1/user/login">/api/v1/user/login</a>
        </li>
        <li>
          <a href="/api/v1/anuncios">/api/v1/anuncios</a>
        </li>
        <li>
          <a href="/api/v1/anuncios">/api/v1/tags</a>
        </li>
      </ul>
    </div>
  `);
});
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('404');
  err.status = 404;
  return next(err);
});

app.use((err, req, res, next) => { // eslint-disable-line
  debug(err.stack);
  const { status, error } = errorResponses(err.message, req.t);
  return res.status(status).json({
    success: false,
    error,
  });
});

module.exports = app;
