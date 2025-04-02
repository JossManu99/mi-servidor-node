const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresarolSchema = new Schema({
  empresarol: { type: String, required: true },
  turnos: { type: [String], required: true },
  rutas: { type: [String], required: true },
  fechaCreacion: { type: Date, default: Date.now },
  elaboradoPor: { type: String, required: true },
});

const Empresarol = mongoose.model('Clientesrol', empresarolSchema);

module.exports = Empresarol;
