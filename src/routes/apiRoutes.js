// src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const apiHolaMundo = require('../controllers/apiHolaMundo');

router.get('/data', apiController.getData);
// Agrega más rutas aquí según tus necesidades

router.get('/hola-mundo',apiHolaMundo.getData);

module.exports = router;
