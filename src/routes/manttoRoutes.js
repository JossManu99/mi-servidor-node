const express = require('express');
const router = express.Router();
const mantenimientoController = require('../controllers/manttoController');

// Rutas básicas CRUD
router.get('/mantenimiento', mantenimientoController.getAllMantenimientos);
router.get('/mantenimiento/:id', mantenimientoController.getMantenimientoById);
router.post('/mantenimiento', mantenimientoController.createMantenimiento);
router.put('/mantenimiento/:id', mantenimientoController.updateMantenimiento);
router.delete('/mantenimiento/:id', mantenimientoController.deleteMantenimiento);

// Rutas para consultas específicas
router.get('/mantenimiento/fecha/rango', mantenimientoController.getMantenimientosByDateRange);
router.get('/mantenimiento/autobus/:numeroEconomico', mantenimientoController.getMantenimientosByNumeroEconomico);
router.get('/mantenimiento/operador/:nombreOperador', mantenimientoController.getMantenimientosByOperador);
router.get('/mantenimiento/reporte', mantenimientoController.getMantenimientosReport);

module.exports = router;