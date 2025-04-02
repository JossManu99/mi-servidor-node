const express = require('express');
const router = express.Router();
const operadorController = require('../controllers/operadorController');

// Ruta para crear un operador
router.post('/operadores', operadorController.createOperador);

// Ruta para obtener todos los operadores
router.get('/operadores', operadorController.getOperadores);

// Ruta para obtener un operador por ID
router.get('/operadores/:id', operadorController.getOperadorById);

// Ruta para actualizar un operador por ID
router.put('/operadores/:id', operadorController.updateOperador);

// Ruta para eliminar un operador por ID
router.delete('/operadores/:id', operadorController.deleteOperador);

module.exports = router;
