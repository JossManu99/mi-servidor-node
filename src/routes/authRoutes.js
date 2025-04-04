const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js"); 
const check = require("../middlewares/auth");  // Asegúrate de que la ruta es correcta

// Rutas de autenticación
router.post("/register", authController.register);
router.post("/login", authController.login);

// Nota: Si usas el token para obtener el id del usuario, el endpoint de profile no requiere parámetro de id
// Puedes mantenerlo como está o cambiarlo a '/profile'
router.get("/profile/:id", check.auth, authController.profile);

// Endpoint para actualizar el usuario
router.put("/update", check.auth, authController.update);

// Endpoint para eliminar el usuario (nuevo)
router.delete("/delete", check.auth, authController.delete);

module.exports = router;
