// createToken.js
const jwt = require("jwt-simple");
const moment = require("moment");

const secret = process.env.JWT_SECRET;

const createToken = (user) => {
  // Verifica que el objeto usuario tenga todos los campos necesarios
  if (!user || !user._id || !user.name || !user.email) {
    console.error("Error: Los datos del usuario son incompletos:", user);
    throw new Error("El objeto usuario debe contener _id, name, email, y demás campos requeridos.");
  }

  // Crea el payload
  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname || "", // Opcional, asignar cadena vacía si no está definido
    email: user.email,
    role: user.role || "user", // Rol por defecto si no está definido
    image: user.image || "", // Imagen por defecto si no está definida
    iat: moment().unix(), // Fecha de creación (issued at)
    exp: moment().add(30, "days").unix(), // Fecha de expiración (30 días)
  };

  try {
    const token = jwt.encode(payload, secret);
    console.log("Token generado exitosamente:", token);
    return token;
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw new Error("Error al generar el token JWT.");
  }
};

module.exports = { createToken };
