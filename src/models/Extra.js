const mongoose = require('mongoose');

const extraSchema = new mongoose.Schema(
  {
    turno: { type: String, required: true },
    entrada: {
      horario: { type: String, required: true },
      rutaSalida: { type: String, required: true },
      rutaDestino: { type: String, required: true },
      numeroAutobus: { type: String, required: false },
      operador: { type: String, required: false }
    },
    salida: {
      horario: { type: String, required: true },
      rutaSalida: { type: String, required: true },
      rutaDestino: { type: String, required: true },
      numeroAutobus: { type: String, required: false },
      operador: { type: String, required: false }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Extra', extraSchema);
