const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const check = require("../middlewares/auth");

// Rutas de autenticación
router.post("/register", authController.register);
router.post("/login", authController.login);

// Endpoint para obtener el perfil (usando parámetro o token)
router.get("/profile/:id", check.auth, authController.profile);

// Endpoint para actualizar el usuario (del usuario autenticado)
router.put("/update", check.auth, authController.update);

// Endpoint para eliminar el usuario (del usuario autenticado)
router.delete("/delete", check.auth, authController.delete);

// Endpoints para administración de usuarios
router.get("/users", check.auth, authController.getAllUsers);
router.get("/users/:id", check.auth, authController.getUserById);

module.exports = router;
