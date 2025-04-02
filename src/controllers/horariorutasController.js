const mongoose = require('mongoose');
const Ruta = require('../models/RutaV');

exports.obtenerRutas = async (req, res) => {
    try {
        const rutas = await Ruta.find();
        res.json(rutas);
    } catch (error) {
        console.error("Error al obtener rutas:", error);
        res.status(500).json({ error: "Error al obtener rutas" });
    }
};

exports.obtenerRuta = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const ruta = await Ruta.findById(id);
        if (!ruta) {
            return res.status(404).json({ error: "Ruta no encontrada" });
        }
        res.json(ruta);
    } catch (error) {
        console.error("Error al obtener la ruta:", error);
        res.status(500).json({ error: "Error al obtener la ruta" });
    }
};

exports.crearRuta = async (req, res) => {
    try {
        console.log("Datos recibidos para crear ruta:", req.body);

        const nuevaRuta = new Ruta({
            numeroRuta: req.body.numeroRuta,
            nombreCliente: req.body.nombreCliente,
            turnos: Array.isArray(req.body.turnos) ? req.body.turnos : [],
            horarios: Array.isArray(req.body.horarios) ? req.body.horarios : [],
            rutaSalida: Array.isArray(req.body.rutaSalida) ? req.body.rutaSalida : [],
            rutaDestino: Array.isArray(req.body.rutaDestino) ? req.body.rutaDestino : [],
            unidades: Array.isArray(req.body.unidades) ? req.body.unidades.map(Number) : [],
            operadores: Array.isArray(req.body.operadores) ? req.body.operadores : []
        });

        await nuevaRuta.save();
        res.status(201).json(nuevaRuta);
    } catch (error) {
        console.error("Error al crear la ruta:", error);
        res.status(500).json({ error: "Error al crear la ruta" });
    }
};

exports.actualizarRuta = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        console.log("Datos recibidos para actualizar:", req.body);
        console.log("ID de la ruta a actualizar:", id);

        const rutaActualizada = await Ruta.findByIdAndUpdate(
            id,
            {
                numeroRuta: req.body.numeroRuta,
                nombreCliente: req.body.nombreCliente,
                turnos: Array.isArray(req.body.turnos) ? req.body.turnos : [],
                horarios: Array.isArray(req.body.horarios) ? req.body.horarios : [],
                rutaSalida: Array.isArray(req.body.rutaSalida) ? req.body.rutaSalida : [],
                rutaDestino: Array.isArray(req.body.rutaDestino) ? req.body.rutaDestino : [],
                unidades: Array.isArray(req.body.unidades) ? req.body.unidades.map(Number) : [],
                operadores: Array.isArray(req.body.operadores) ? req.body.operadores : []
            },
            { new: true, runValidators: true }
        );

        if (!rutaActualizada) {
            console.error("Error: Ruta no encontrada en la BD");
            return res.status(404).json({ error: "Ruta no encontrada" });
        }

        console.log("Ruta actualizada correctamente:", rutaActualizada);
        res.json(rutaActualizada);
    } catch (error) {
        console.error("Error al actualizar la ruta:", error);
        res.status(500).json({ error: "Error al actualizar la ruta" });
    }
};

exports.eliminarRuta = async (req, res) => {
    const { id } = req.params;

    console.log("ID recibido para eliminar:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("ID no válido:", id);
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const rutaEliminada = await Ruta.findByIdAndDelete(id);

        if (!rutaEliminada) {
            console.error("Ruta no encontrada para eliminar con ID:", id);
            return res.status(404).json({ error: "Ruta no encontrada" });
        }

        console.log("Ruta eliminada correctamente:", id);
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar la ruta:", error);
        res.status(500).json({ error: "Error al eliminar la ruta", details: error.message });
    }
};