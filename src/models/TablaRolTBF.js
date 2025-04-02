// models/TablaRolTBF.js

const mongoose = require('mongoose');

// Esquema para los turnos, con campos para "entrada" y "salida"
const turnoSchema = new mongoose.Schema({
  turno: { type: String, required: true },
  horarioEntrada: { type: String, required: true },
  horarioSalida: { type: String, required: true },
  horarioinicio_jordana_salidaOrigen: { type: String, required: true },
  horarioinicio_jornada_llegada_a_Destino: { type: String, required: true },
  horariosalida_jornada_salida_de_Origen: { type: String, required: true },
  horariosalida_jornada_llegada_a_Destino: { type: String, required: true },
  
  // Campo para distinguir si es "medio" o "completo"
  tipoViaje: {
    type: String,
    enum: ['medio', 'completo'],
    default: 'medio'
  },

  // Los datos de entrada y salida se guardan por separado
  entrada: {
    numeroAutobus: { type: String, default: '' },
    operador: { type: String, default: '' }
  },
  salida: {
    numeroAutobus: { type: String, default: '' },
    operador: { type: String, default: '' }
  }
}, { _id: false });

// Esquema para las rutas
// Se incluyen los campos "costo", "saleDe" (origen) y "llegaA" (destino)
const rutaSchema = new mongoose.Schema({
  numeroRuta: { type: String, required: true },
  nombreCliente: { type: String, required: true },
  costo: { type: Number, required: true },
  saleDe: { type: String, required: true },
  llegaA: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  diaInicio: { type: String },
  mesInicio: { type: String },
  anioInicio: { type: String },
  turnos: [turnoSchema]
}, { _id: false });

// Esquema principal para TablaRolTBF
const tablaRolTbfSchema = new mongoose.Schema({
  numeroCambio: { type: String, required: true },
  diaInicio: { type: String },
  mesInicio: { type: String },
  anioInicio: { type: String },
  elaboradoPor: { type: String },
  rutas: [rutaSchema]
}, {
  timestamps: true
});

const TablaRolTbf = mongoose.model('TablaRolTbf', tablaRolTbfSchema);
module.exports = TablaRolTbf;
