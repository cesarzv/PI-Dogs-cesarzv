const express = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dogsRouter');
const temperamentsRouter = require('./temperamentsRouter');
//const { Breed, Temperament } = require('../db');
const { allData, postDog } = require('../controllers/dogsController');

//const router = Router();
const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentsRouter);

module.exports = router;
