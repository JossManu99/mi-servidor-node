const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const turnoSchema = new Schema(
  {
    turno: { type: String },
    horarioEntrada: { type: String },
    horarioSalida: { type: String },
    horarioinicio_jordana_salidaOrigen: { type: String },
    horarioinicio_jornada_llegada_a_Destino: { type: String },
    horariosalida_jornada_salida_de_Origen: { type: String },
    horariosalida_jornada_llegada_a_Destino: { type: String }
  },
  { _id: false }
);

const viajeSchema = new Schema(
  {
    numeroRuta: { type: String, required: true },
    nombreCliente: { type: String, required: true },
    saleDe: { type: String, required: true },
    llegaA: { type: String, required: true },
    distancia: { type: Number, required: true },
    costoPorKm: { type: Number, required: true },
    costo: { type: Number, required: true },
    // Eliminados costoMedioViaje, viajeCompleto y medioViaje
    turnos: [turnoSchema]
  },
  { timestamps: true }
);

const Viaje = mongoose.model('Viajes', viajeSchema);
module.exports = Viaje;
