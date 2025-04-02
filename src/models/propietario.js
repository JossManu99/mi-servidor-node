const mongoose = require('mongoose');

const PropietarioSchema = new mongoose.Schema({
  nombrePropietario: {
    type: String,
    required: true,
    trim: true, // Elimina espacios en blanco al inicio y final
  },
  rfc: {
    type: String,
    required: true,
    unique: true, // Asegura que no haya RFCs duplicados
    uppercase: true, // Convierte el RFC a mayúsculas automáticamente
  },
}, {
  timestamps: true, // Agrega automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Propietario', PropietarioSchema);
