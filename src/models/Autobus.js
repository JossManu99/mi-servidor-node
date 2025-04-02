const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  numeroEconomico: {
    type: String,
    required: true,
  },
  numeroMotor: {
    type: String,
    required: true,
  },
  numeroSerie: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  tipoPlaca: {
    type: String,
    enum: ['federal', 'estatal', 'ambas'],
    required: true,
  },
  numeroPlacaEstatal: {
    type: String,
    default: null,
  },
  numeroPlacaFederal: {
    type: String,
    default: null,
  },
  verificacionContaminante: {
    type: String,
    default: null,
  },
  caducidadVerificacionContaminante: {
    type: Date,
    default: null,
  },
  verificacionFisicoMecanico: {
    type: String,
    default: null,
  },
  caducidadVerificacionFisicoMecanico: {
    type: Date,
    default: null,
  },
  tarjetaCirculacion: {
    type: String,
    required: true,
  },
  caducidadTarjetaCirculacion: {
    type: Date,
    required: true,
  },
  seguro: {
    type: String,
    default: null,
  },
  caducidadSeguro: {
    type: Date,
    default: null,
  },
  permiso: {
    type: String,
    default: null,
  },
  caducidadPermiso: {
    type: Date,
    default: null,
  },
  foto: {
    type: String,
    default: null,
  },
  numeroAsientos: {
    type: Number,
    required: true,
  },
  rendimientoPromedio:{
    type:Number,
    required: true,

  },
  usos: {
    type: [String], // Lista de usos (ejemplo: ['transportePublico', 'transporteEscolar'])
    default: [],
  },
  nombrepropietario: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Bus = mongoose.model('Autobuses', busSchema);

module.exports = Bus;
