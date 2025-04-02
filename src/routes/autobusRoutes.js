const express = require('express');
const router = express.Router();
const autobusController = require('../controllers/autobusController');

// Ruta para crear un autobús
router.post('/autobuses', autobusController.createBus);

// Ruta para obtener todos los autobuses
router.get('/autobuses', autobusController.getBuses);

// Ruta para obtener un autobús por ID
router.get('/autobuses/:id', autobusController.getBusById);

// Ruta para actualizar un autobús por ID
router.put('/autobuses/:id', autobusController.updateBus);

// Ruta para eliminar un autobús por ID
router.delete('/autobuses/:id', autobusController.deleteBus);

module.exports = router;
