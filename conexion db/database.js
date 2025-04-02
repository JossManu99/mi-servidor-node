require('dotenv').config(); // Cargar variables de entorno desde .env
const mongoose = require('mongoose');

// Verificar si la variable MONGO_URI está definida
if (!process.env.MONGO_URI) {
  throw new Error('Error: La variable de entorno MONGO_URI no está definida en el archivo .env');
}

// Obtener la URI de MongoDB desde el archivo .env
const mongoURI = process.env.MONGO_URI;

// Función para conectar a MongoDB
const connectToMongoDB = () => {
  mongoose
    .connect(mongoURI, {
      dbName: 'logistica', // Especificar la base de datos 'logistica'
    })
    .then(() => {
      console.log('Conectado a MongoDB remoto (Atlas) a la base de datos logistica');
    })
    .catch((err) => {
      console.error('Error al conectar con MongoDB:', err);
    });
};

// Exportar la función
module.exports = connectToMongoDB;
