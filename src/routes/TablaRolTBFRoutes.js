const express = require('express');
const router = express.Router();
const tablaRolTbfController = require('../controllers/TablaRolTBFController');

// Rutas para TablaRolTbf
router.get('/tablaroltbf', tablaRolTbfController.getAllTablaRolTbf);
router.get('/tablaroltbf/:id', tablaRolTbfController.getTablaRolTbfById);
router.post('/tablaroltbf', tablaRolTbfController.createTablaRolTbf);
router.put('/tablaroltbf/:id', tablaRolTbfController.updateTablaRolTbf);
router.delete('/tablaroltbf/:id', tablaRolTbfController.deleteTablaRolTbf);

module.exports = router;