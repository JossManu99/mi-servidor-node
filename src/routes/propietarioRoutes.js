const express = require('express');
const propietarioController = require('../controllers/propietarioController');

const router = express.Router();

router.post('/propietarios', propietarioController.crearPropietario);
router.get('/propietarios', propietarioController.obtenerPropietarios);
router.get('/propietarios/:id', propietarioController.obtenerPropietarioPorId);
router.put('/propietarios/:id', propietarioController.actualizarPropietario);
router.delete('/propietarios/:id', propietarioController.eliminarPropietario);

module.exports = router;
