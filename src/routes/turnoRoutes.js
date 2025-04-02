const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/turnoController');

// Rutas para manejar las operaciones CRUD de empresa

// Crear una empresa
router.post('/empresas', empresaController.createEmpresa);

// Obtener todas las empresas
router.get('/empresas', empresaController.getEmpresas);

// Obtener una empresa por su ID
router.get('/empresas/:id', empresaController.getEmpresaById);

// Actualizar una empresa por su ID
router.put('/empresas/:id', empresaController.updateEmpresa);

// Eliminar una empresa por su ID
router.delete('/empresas/:id', empresaController.deleteEmpresa);

module.exports = router;
