const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js"); 
const check = require("../middlewares/auth");  // Asegúrate de que la ruta es correcta

// Rutas de autenticación
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile/:id", check.auth, authController.profile);
router.put("/update", check.auth, authController.update);

module.exports = router;
