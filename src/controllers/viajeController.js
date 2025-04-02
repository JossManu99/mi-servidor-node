const Viaje = require('../models/Viaje');

// Crear un viaje
exports.createViaje = async (req, res) => {
  try {
    const {
      numeroRuta,
      nombreCliente,
      saleDe,
      llegaA,
      distancia,
      costoPorKm,
      costo,
      // Eliminamos: costoMedioViaje, viajeCompleto, medioViaje
      turnos
    } = req.body;

    // Validaciones mínimas
    if (
      !numeroRuta ||
      !nombreCliente ||
      !saleDe ||
      !llegaA ||
      distancia === undefined ||
      costoPorKm === undefined ||
      costo === undefined
    ) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const turnosProcesados = (turnos || []).map((turno) => ({
      turno: turno.turno,
      horarioEntrada: turno.horarioEntrada,
      horarioSalida: turno.horarioSalida,
      horarioinicio_jordana_salidaOrigen: turno.horarioinicio_jordana_salidaOrigen,
      horarioinicio_jornada_llegada_a_Destino: turno.horarioinicio_jornada_llegada_a_Destino,
      horariosalida_jornada_salida_de_Origen: turno.horariosalida_jornada_salida_de_Origen,
      horariosalida_jornada_llegada_a_Destino: turno.horariosalida_jornada_llegada_a_Destino
    }));

    const viajeData = {
      numeroRuta,
      nombreCliente,
      saleDe,
      llegaA,
      distancia: parseFloat(distancia),
      costoPorKm: parseFloat(costoPorKm),
      costo: parseFloat(costo),
      turnos: turnosProcesados
    };

    const viaje = new Viaje(viajeData);
    await viaje.save();

    res.status(201).json(viaje);
  } catch (error) {
    console.error('Error al crear el viaje:', error);
    res.status(400).json({ message: 'Error al crear el viaje', error: error.message });
  }
};

// Obtener todos los viajes
exports.getViajes = async (req, res) => {
  try {
    const viajes = await Viaje.find().sort({ createdAt: -1 });
    res.status(200).json(viajes);
  } catch (error) {
    console.error('Error al obtener los viajes:', error);
    res.status(400).json({ message: 'Error al obtener los viajes', error: error.message });
  }
};

// Obtener un viaje por ID
exports.getViajeById = async (req, res) => {
  try {
    const viaje = await Viaje.findById(req.params.id);
    if (!viaje) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    res.status(200).json(viaje);
  } catch (error) {
    console.error('Error al obtener el viaje:', error);
    res.status(400).json({ message: 'Error al obtener el viaje', error: error.message });
  }
};

// Actualizar un viaje
exports.updateViaje = async (req, res) => {
  try {
    const {
      numeroRuta,
      nombreCliente,
      saleDe,
      llegaA,
      distancia,
      costoPorKm,
      costo,
      // Eliminamos: costoMedioViaje, viajeCompleto, medioViaje
      turnos
    } = req.body;

    if (
      !numeroRuta ||
      !nombreCliente ||
      !saleDe ||
      !llegaA ||
      distancia === undefined ||
      costoPorKm === undefined ||
      costo === undefined
    ) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const turnosProcesados = (turnos || []).map((turno) => ({
      turno: turno.turno,
      horarioEntrada: turno.horarioEntrada,
      horarioSalida: turno.horarioSalida,
      horarioinicio_jordana_salidaOrigen: turno.horarioinicio_jordana_salidaOrigen,
      horarioinicio_jornada_llegada_a_Destino: turno.horarioinicio_jornada_llegada_a_Destino,
      horariosalida_jornada_salida_de_Origen: turno.horariosalida_jornada_salida_de_Origen,
      horariosalida_jornada_llegada_a_Destino: turno.horariosalida_jornada_llegada_a_Destino
    }));

    const viajeData = {
      numeroRuta,
      nombreCliente,
      saleDe,
      llegaA,
      distancia: parseFloat(distancia),
      costoPorKm: parseFloat(costoPorKm),
      costo: parseFloat(costo),
      turnos: turnosProcesados
    };

    const viaje = await Viaje.findByIdAndUpdate(req.params.id, viajeData, { new: true });

    if (!viaje) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    res.status(200).json(viaje);
  } catch (error) {
    console.error('Error al actualizar el viaje:', error);
    res.status(400).json({ message: 'Error al actualizar el viaje', error: error.message });
  }
};

// Eliminar un viaje
exports.deleteViaje = async (req, res) => {
  try {
    const viaje = await Viaje.findByIdAndDelete(req.params.id);
    if (!viaje) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }
    res.status(200).json({ message: 'Viaje eliminado correctamente', id: req.params.id });
  } catch (error) {
    console.error('Error al eliminar el viaje:', error);
    res.status(400).json({ message: 'Error al eliminar el viaje', error: error.message });
  }
};
