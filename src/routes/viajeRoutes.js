const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');

router.post('/viajes', viajeController.createViaje);
router.get('/viajes', viajeController.getViajes);
router.get('/viajes/:id', viajeController.getViajeById);
router.put('/viajes/:id', viajeController.updateViaje);
router.delete('/viajes/:id', viajeController.deleteViaje);

module.exports = router;
