const express = require('express');
const router = express.Router();
const extraController = require('../controllers/extraController');

// Rutas para el CRUD de Extras
router.get('/extras', extraController.getExtras);
router.get('/extras/:id', extraController.getExtraById);
router.post('/extras', extraController.createExtra);
router.put('/extras/:id', extraController.updateExtra);
router.delete('/extras/:id', extraController.deleteExtra);

module.exports = router;
