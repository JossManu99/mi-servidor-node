const mongoose = require('mongoose');

// Esquema para los Turnos (sin `_id` automático)
const TurnoSchema = new mongoose.Schema(
  {
    turno: { type: String, required: true },
    horarioEntrada: { type: String, required: true },
    horarioSalida: { type: String, required: true },
    horarioinicio_jordana_salidaOrigen: { type: String, required: true },
    horarioinicio_jornada_llegada_a_Destino: { type: String, required: true },
    horariosalida_jornada_salida_de_Origen: { type: String, required: true },
    horariosalida_jornada_llegada_a_Destino: { type: String, required: true }
  },
  { _id: false }
);

// Esquema para las Rutas (sin `_id` automático)
// Se incluyen los campos "costo", "saleDe" y "llegaA"
const RutaSchema = new mongoose.Schema(
  {
    numeroRuta: { type: String, required: true },
    nombreCliente: { type: String, required: true },
    costo: { type: Number, required: true },
    saleDe: { type: String, required: true },
    llegaA: { type: String, required: true },
    turnos: [TurnoSchema]
  },
  { _id: false }
);

// Esquema principal para `Tablarol`
const TablarolSchema = new mongoose.Schema({
  numeroCambio: { type: String, required: true },
  diaInicio: { type: String, required: true },
  mesInicio: { type: String, required: true },
  anioInicio: { type: String, required: true },
  elaboradoPor: { type: String, required: true },
  rutas: [RutaSchema]
});

module.exports = mongoose.model('Tablarol', TablarolSchema);
