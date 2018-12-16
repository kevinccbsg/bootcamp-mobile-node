const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ title: 'Hello world' });
});

module.exports = app;
