const mongoose = require('mongoose');

// Definir el esquema
const operadorSchema = new mongoose.Schema({
  numeroOperador: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  fechaIngreso: {
    type: Date,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  tipoLicencia: {
    type: String,
    enum: ['federal', 'estatal', 'ambas'],
    required: true,
  },
  documentoLicenciaEstatal: {
    type: String, // Guardaremos la URL del archivo en Cloudinary
    required: function () {
      return this.tipoLicencia === 'estatal' || this.tipoLicencia === 'ambas';
    },
  },
  fechaVencimientoLicenciaEstatal: {
    type: Date,
    required: function () {
      return this.tipoLicencia === 'estatal' || this.tipoLicencia === 'ambas';
    },
  },
  documentoLicenciaFederal: {
    type: String, // Guardaremos la URL del archivo en Cloudinary
    required: function () {
      return this.tipoLicencia === 'federal' || this.tipoLicencia === 'ambas';
    },
  },
  fechaVencimientoLicenciaFederal: {
    type: Date,
    required: function () {
      return this.tipoLicencia === 'federal' || this.tipoLicencia === 'ambas';
    },
  },
  puesto: {
    type: String,
    required: true,
  },
  fechaVencimientoExamenMedico: {
    type: Date,
    required: true,
  },
  documentoExamenMedico: {
    type: String, // Guardaremos la URL del archivo en Cloudinary
  },
  observaciones: {
    type: String,
    required: false,
  },
  documentoTarjeton: {
    type: String, // Guardaremos la URL del archivo en Cloudinary
  },
  fechaVencimientoTarjeton: {
    type: Date, // Fecha de vencimiento del tarjetón
    required: true,
  },
  foto: {
    type: String, // Guardaremos la URL de la foto del operador (por ejemplo, en Cloudinary)
    required: false, // Este campo puede ser opcional
  },
});

// Crear el modelo
const Operador = mongoose.model('Operadores', operadorSchema);

module.exports = Operador;