const mongoose = require('mongoose');

const CombustibleSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  costoPorLitro: {
    type: Number,
    required: true
  },
  numeroEconomico: {
    type: String,
    required: true
  },
  folioSeguridadInicial: {
    type: String,
    required: true
  },
  folioSeguridadRegreso: {
    type: String,
    required: true
  },
  kilometraje: {
    type: Number,
    required: true
  },
  litrosCargados: {
    type: Number,
    required: true
  },
  costoTotal: {
    type: Number,
    required: true
  },
  contador: {
    type: Number,
    required: true
  },
  rendimientoPromedio: {
    type: Number,
    required: true
  },
  rendimientoAlcanzado: {
    type: Number,
    required: true
  },
  taller: {
    type: Boolean,
    default: false,
    set: v => {
      // Handle both boolean values and string representations
      if (v === 'true') return true;
      if (v === 'false') return false;
      return Boolean(v);
    }
  },
  foraneo: {
    type: Boolean,
    default: false,
    set: v => {
      // Handle both boolean values and string representations
      if (v === 'true') return true;
      if (v === 'false') return false;
      return Boolean(v);
    }
  },
  gasolinera: {
    type: String,
    required: function() {
      return this.foraneo === true;
    },
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Combustible', CombustibleSchema);