const mongoose = require('mongoose');

const RutaSchema = new mongoose.Schema({
    numeroRuta: { type: Number, unique: true, required: true },
    nombreCliente: { type: String, required: true },
    turnos: [{ type: String, required: true }],
    horarios: [{ type: String, required: true }],
    rutaSalida: [{ type: String, required: true }],
    rutaDestino: [{ type: String, required: true }],
    unidades: [{ type: Number, required: true }],
    operadores: [{ type: String, required: true }]
}, { timestamps: true });

module.exports = mongoose.model('RutasViaje', RutaSchema);