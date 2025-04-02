// models/Refaction.js
const mongoose = require('mongoose');

const refaccionSchema = new mongoose.Schema({
  cantidad: {
    type: String,
    required: [true, 'La cantidad es obligatoria']
  },
  nombreRefaccion: {
    type: String,
    required: [true, 'El nombre de la refacción es obligatorio']
  },
  codigo: {
    type: String,
    required: [true, 'El código de la refacción es obligatorio']
  },
  nombreProveedor: {
    type: String,
    required: [true, 'El nombre del proveedor es obligatorio']
  },
  costoTotal: {
    type: String,
    required: [true, 'El costo total es obligatorio']
  },
  // Nuevo campo para almacenar el costo por pieza
  costoIndividual: {
    type: Number,
    default: 0
  },
  // Campo opcional para descripción
  descripcion: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // crea createdAt y updatedAt automáticamente
});

const Refaccion = mongoose.model('Refaccion', refaccionSchema);

module.exports = Refaccion;
