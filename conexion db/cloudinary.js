const cloudinary = require('cloudinary').v2;

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verificar la conexión a Cloudinary
cloudinary.api.ping()
  .then(() => {
    console.log('Conexión exitosa a Cloudinary');
  })
  .catch((error) => {
    console.error('Error al conectar con Cloudinary:', error);
  });

module.exports = cloudinary;
