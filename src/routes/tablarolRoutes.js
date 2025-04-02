const express = require('express');
const router = express.Router();
const tablarolController = require('../controllers/tablarollController');

router.post('/tablaroles', tablarolController.createTablarol);
router.get('/tablaroles', tablarolController.getTablaroles);
router.get('/tablaroles/:id', tablarolController.getTablarolById);
router.put('/tablaroles/:id', tablarolController.updateTablarol);
router.delete('/tablaroles/:id', tablarolController.deleteTablarol);

module.exports = router;
