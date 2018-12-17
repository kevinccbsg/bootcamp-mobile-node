const express = require('express');
const { getAnuncio } = require('../controllers/anuncio');
const { register, authenticate } = require('../controllers/user');

const router = express.Router();

router.get('/v1/anuncios', getAnuncio);
router.post('/v1/user', register);
router.post('/v1/user/login', authenticate);

module.exports = router;
