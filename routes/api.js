const express = require('express');
const { getAnuncio } = require('../controllers/anuncio');
const { register, authenticate } = require('../controllers/user');
const authRoute = require('./authRoute');

const router = express.Router();

router.get('/v1/anuncios', authRoute, getAnuncio);
router.post('/v1/user/register', register);
router.post('/v1/user/login', authenticate);

module.exports = router;
