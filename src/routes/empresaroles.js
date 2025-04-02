const express = require('express');
const router = express.Router();
const empresarolController = require('../controllers/empresarolcontroller');

// Crear una nueva empresa
router.post('/empresaroles', empresarolController.createEmpresarol);

// Obtener todas las empresas
router.get('/empresaroles', empresarolController.getEmpresaroles);

// Obtener una empresa por su ID
router.get('/empresaroles/:id', empresarolController.getEmpresarolById);

// Actualizar una empresa por su ID
router.put('/empresaroles/:id', empresarolController.updateEmpresarol);

// Eliminar una empresa por su ID
router.delete('/empresaroles/:id', empresarolController.deleteEmpresarol);

module.exports = router;
