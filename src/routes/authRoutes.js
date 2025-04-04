const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const check = require("../middlewares/auth");

// Rutas de autenticación
router.post("/register", authController.register);
router.post("/login", authController.login);

// Endpoint para obtener el perfil (usando parámetro o token, según convenga)
router.get("/profile/:id", check.auth, authController.profile);

// Endpoint para actualizar el usuario
router.put("/update", check.auth, authController.update);

// Endpoint para eliminar el usuario
router.delete("/delete", check.auth, authController.delete);

// Nuevo endpoint para obtener todos los usuarios
router.get("/users", check.auth, authController.getAllUsers);

module.exports = router;
