// routes/combustibleRoutes.js
const express = require('express');
const router = express.Router();
const combustibleController = require('../controllers/CombustibleController');

// Rutas para combustible
router.post('/combustible', combustibleController.crearCombustible);
router.get('/combustible', combustibleController.obtenerCombustibles);
router.get('/combustible:id', combustibleController.obtenerCombustiblePorId);
router.put('/combustible:id', combustibleController.actualizarCombustible);
router.delete('/combustible:id', combustibleController.eliminarCombustible);

module.exports = router;