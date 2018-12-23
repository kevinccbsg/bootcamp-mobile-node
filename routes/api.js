const express = require('express');
const { getAnuncio, getTags } = require('../controllers/anuncio');
const { register, authenticate } = require('../controllers/user');
const authRoute = require('./authRoute');

const router = express.Router();

router.get('/v1/anuncios', authRoute, getAnuncio);
router.get('/v1/tags', authRoute, getTags);
router.post('/v1/user/register', register);
router.post('/v1/user/login', authenticate);

module.exports = router;
