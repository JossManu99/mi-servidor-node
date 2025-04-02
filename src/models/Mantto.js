const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema para las refacciones
const RefaccionSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la refacción es obligatorio']
  },
  costo: {
    type: Number,
    required: [true, 'El costo de la refacción es obligatorio']
  },
  descripcion: {
    type: String
  }

  
});

// Esquema principal de mantenimiento
const MantenimientoSchema = new Schema({
  fecha: {
    type: String,
    required: [true, 'La fecha es obligatoria']
  },
  hora: {
    type: String,
    required: [true, 'La hora es obligatoria']
  },
  numeroEconomico: {
    type: String,
    required: [true, 'El número económico es obligatorio']
  },
  nombreOperador: {
    type: String,
    required: [true, 'El nombre del operador es obligatorio']
  },
  kilometraje: {
    type: String,
    required: [true, 'El kilometraje es obligatorio']
  },
  falla: {
    type: String,
    required: [true, 'La descripción de la falla es obligatoria']
  },
  solucion: {
    type: String,
    required: [true, 'La solución es obligatoria']
  },
  horasUsadas: {
    inicio: {
      type: String,
      required: [true, 'La hora de inicio es obligatoria']
    },
    fin: {
      type: String,
      required: [true, 'La hora de fin es obligatoria']
    }
  },
  refacciones: [RefaccionSchema],
  total: {
    type: Number,
    required: [true, 'El total es obligatorio']
  },
  asignado: {
    type: String,
    required: [true, 'El nombre del asignado es obligatorio']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware para actualizar el timestamp
MantenimientoSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('Mantenimiento', MantenimientoSchema);