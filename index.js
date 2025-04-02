const app = require('./app'); // Importa la configuración de Express

const port = 3000
;

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
