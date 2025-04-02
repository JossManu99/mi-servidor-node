const express = require('express');
const router = express.Router();
const refaccionControlador = require('../controllers/refaccionControlador');

// Obtener todas las refacciones
router.get('/refacciones', refaccionControlador.obtenerTodasLasRefacciones);

// Obtener una refacción por su ID
router.get('/refacciones/:id', refaccionControlador.obtenerRefaccionPorId);

// Crear una nueva refacción
router.post('/refacciones', refaccionControlador.crearRefaccion);

// Actualizar una refacción por su ID
router.put('/refacciones/:id', refaccionControlador.actualizarRefaccion);

// Eliminar una refacción por su ID
router.delete('/refacciones/:id', refaccionControlador.eliminarRefaccion);

module.exports = router;