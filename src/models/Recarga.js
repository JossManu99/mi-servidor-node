// models/Recarga.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// 1. Sub-esquema para cada movimiento de recarga (historial)
const HistorialSchema = new Schema(
  {
    quienRecargo: String,
    cantidadAnterior: Number,
    cantidadCargada: Number,
    cantidadRestante: Number,
    fecha: String,
    hora: String,
    numeroEconomico: String,
    // Campo extra para describir o anotar algo adicional
    observacion: String,
  },
  { _id: false }
);

// 2. Sub-esquema para cada distribución
const DistribucionSchema = new Schema(
  {
    nombrePropietario: {
      type: String,
      required: [true, 'El nombre del propietario es obligatorio'],
    },
    // Cantidad asignada inicialmente (no se modifica)
    cantidadrepartirlitros: {
      type: Number,
      required: [true, 'La cantidad de litros es obligatoria'],
    },
    // Nuevo campo para ir descontando (modificable)
    cantidadrepartirlitrosrestantes: {
      type: Number,
      default: 0, // O podrías iniciarlo con el mismo valor de cantidadrepartirlitros
    },
    // Aquí se guarda el historial de recargas
    historial: {
      type: [HistorialSchema],
      default: [],
    },
  },
  { _id: false }
);

// 3. Esquema principal de Recarga
const RecargaSchema = new Schema(
  {
    costo: {
      type: Number,
      required: [true, 'El costo es obligatorio'],
    },
    cantidad: {
      type: Number,
      required: [true, 'La cantidad de litros es obligatoria'],
    },
    proveedor: {
      type: String,
      required: [true, 'El proveedor es obligatorio'],
    },
    fecha: {
      type: String,
      required: [true, 'La fecha es obligatoria'],
    },
    // Array de distribuciones
    distribuciones: {
      type: [DistribucionSchema],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Hook para actualizar 'updatedAt' automáticamente en findOneAndUpdate
RecargaSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('Recarga', RecargaSchema);
