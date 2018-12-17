const express = require('express');
const logger = require('morgan');
const config = require('config');
const bodyParser = require('body-parser');
const api = require('./routes/api');

const app = express();

app.use(logger(config.get('logger.format')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const status = err.status || 500;
  res.status(status);
  res.json({ success: false, error: `Error ${status}` });
});

module.exports = app;
