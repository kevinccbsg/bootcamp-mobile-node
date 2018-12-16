const express = require('express');
const { getAnuncio } = require('../controllers/anuncio');

const router = express.Router();

router.get('/v1/anuncios', getAnuncio);

module.exports = router;
