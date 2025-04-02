const express = require('express');
const router = express.Router();
const recargaController = require('../controllers/recargaController');

// Rutas CRUD
router.get('/recargas', recargaController.getAllRecargas);
router.get('/recargas/:id', recargaController.getRecargaById);
router.post('/recargas', recargaController.createRecarga);
router.put('/recargas/:id', recargaController.updateRecarga);
router.delete('/recargas/:id', recargaController.deleteRecarga);

module.exports = router;
