'use strict'
const express = require('express');
const router = express.Router();
const { getAnuncio } = require('../controllers/anuncio');

router.get('/v1/anuncios', getAnuncio);

module.exports = router;
