const express = require('express');
const router = express.Router();
const horariorutasController = require('../controllers/horariorutasController');

router.get('/rutas', horariorutasController.obtenerRutas);
router.get('/rutas/:id', horariorutasController.obtenerRuta);
router.post('/rutas', horariorutasController.crearRuta);
router.put('/rutas/:id', horariorutasController.actualizarRuta);
router.delete('/rutas/:id', horariorutasController.eliminarRuta);

module.exports = router;
