// src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const apiHolaMundo = require('../controllers/apiHolaMundo');
const usuarioController = require('../controllers/usuarioController')

router.get('/data', apiController.getData);
router.get('/hola-mundo',apiHolaMundo.getData);
router.post('/guardar',usuarioController.postUser);
router.get('/usuario', usuarioController.getUsuarios);

module.exports = router;
