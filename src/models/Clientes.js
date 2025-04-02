const mongoose = require('mongoose');

// Esquema de horarios para cada día de la semana
const HorariosSchema = new mongoose.Schema({
    lunes: { type: String, required: true },
    martes: { type: String, required: true },
    miercoles: { type: String, required: true },
    jueves: { type: String, required: true },
    viernes: { type: String, required: true },
    sabado: { type: String, required: true },
    domingo: { type: String, required: true },
}, { _id: false }); // Sin _id en horarios

// Esquema de cada turno de la empresa
const TurnoSchema = new mongoose.Schema({
    clave: { type: Number, required: true },
    turno: { type: String, required: true },
    horarios: { type: HorariosSchema, required: true },
}, { _id: false }); // Sin _id en turnos

// Esquema de la empresa con sus turnos
const EmpresaSchema = new mongoose.Schema({
    empresa: { type: String, required: true, unique: true }, // Nombre de la empresa
    turnos: { type: [TurnoSchema], required: true }, // Array de turnos de la empresa
});

module.exports = mongoose.model('Horariosclientes', EmpresaSchema);
