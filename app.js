'use strict'
const express = require('express');
const logger = require('morgan');
const config = require('config');

const app = express();

app.use(logger(config.get('logger.format')))

app.get('/', (req, res) => {
  res.json({ title: 'Hello world' });
});

module.exports = app;
