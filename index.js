const app = require('./app'); // Importa la configuración de Express

// Usa el puerto asignado en la variable de entorno o el 3000 por defecto
const port = process.env.PORT || 3000;

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
