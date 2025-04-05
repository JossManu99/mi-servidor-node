const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js"); 
const check = require("../middlewares/auth");  // Asegúrate de que la ruta es correcta

// Rutas de autenticación
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile/:id", check.auth, authController.profile);
router.put("/update", check.auth, authController.update);

// Crear un usuario
router.post('/users', authController.createUser);

// Obtener todos los usuarios
router.get('/users', authController.getUsers);

// Obtener un usuario por ID
router.get('/users/:id', authController.getUserById);

// Actualizar un usuario
router.put('/users/:id', authController.updateUser);

// Eliminar un usuario
router.delete('/users/:id', authController.deleteUser);

module.exports = router;
