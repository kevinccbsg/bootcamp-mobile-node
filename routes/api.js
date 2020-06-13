const express = require('express');
const { getAnuncio, getTags } = require('../controllers/anuncio');
const { register, authenticate } = require('../controllers/user');
const authRoute = require('./authRoute');

const router = express.Router();

/**
 * GET /v1/anuncios
 * @summary List Advertisement
 * @tags Advertisement - Everything about Advertisement tasks
 * @param {string} Accept-Language.header - Accept Language - enum:en,es
 * @param {string} tag.query - tag filter
 * @param {boolean} venta.query - isSell filter
 * @param {boolean} nombre.query - Name filter
 * @param {number} precio.query - Price filter
 * @param {number} start.query - start filter
 * @param {number} limit.query - limit filter
 * @param {string} sort - sort filter
 * @return {array<Advertisement>} 200 - successful operation
 * @return {Error} 400 - Invalid parameter
 * @return {Error} 403 - Unauthorized
 * @security JWT
 */
router.get('/v1/anuncios', authRoute, getAnuncio);

/**
 * GET /v1/tags
 * @summary List tags
 * @tags Advertisement - Everything about Advertisement tasks
 * @param {string} Accept-Language.header - Accept Language - enum:en,es
 * @return {array<Tag>} 200 - Usuccessful operation
 * @return {Error} 400 - Invalid parameter
 * @return {Error} 403 - Unauthorized
 * @security JWT
 */
router.get('/v1/tags', authRoute, getTags);

/**
 * POST /v1/user/register
 * @summary Register one user
 * @tags User - Everything about user tasks
 * @param {RegisterUser} request.body.required - Register user payload
 * @return {RegisterUserResponse} 201 - User succesfully registered
 * @return {Error} 400 - Bad request
 * @return {Error} 409 - Already exists
 */
router.post('/v1/user/register', register);

/**
 * POST /v1/user/login
 * @summary Register one user
 * @tags User - Everything about user tasks
 * @param {LoginUser} request.body.required - Register user payload
 * @return {LoginUserResponse} 200 - User succesfully registered
 * @return {Error} 400 - Bad request
 * @return {Error} 403 - Unauthorized
 */
router.post('/v1/user/login', authenticate);

module.exports = router;
