const Tablarol = require('../models/Tablarol');

// Crear un nuevo Tablarol
exports.createTablarol = async (req, res) => {
  try {
    console.log('Datos recibidos en el body:', JSON.stringify(req.body, null, 2));
    const { numeroCambio, diaInicio, mesInicio, anioInicio, elaboradoPor, rutas } = req.body;

    if (!rutas || !Array.isArray(rutas) || rutas.length === 0) {
      return res.status(400).json({ message: 'El array de rutas es requerido y no puede estar vacío' });
    }

    // Estructuramos los datos a guardar, integrando "costo", "saleDe" y "llegaA" en cada ruta
    const tablarolData = {
      numeroCambio,
      diaInicio,
      mesInicio,
      anioInicio,
      elaboradoPor,
      rutas: rutas.map(ruta => ({
        numeroRuta: ruta.numeroRuta,
        nombreCliente: ruta.nombreCliente,
        costo: ruta.costo,            // Costo de la ruta
        saleDe: ruta.saleDe,          // Origen
        llegaA: ruta.llegaA,          // Destino
        turnos: (ruta.turnos || []).filter(turno =>
          turno.turno &&
          turno.horarioEntrada &&
          turno.horarioSalida &&
          turno.horarioinicio_jordana_salidaOrigen &&
          turno.horarioinicio_jornada_llegada_a_Destino &&
          turno.horariosalida_jornada_salida_de_Origen &&
          turno.horariosalida_jornada_llegada_a_Destino
        )
      }))
    };

    console.log('Datos a guardar en Tablarol:', JSON.stringify(tablarolData, null, 2));

    // Verificar que al menos una ruta tenga turnos válidos
    if (tablarolData.rutas.every(ruta => ruta.turnos.length === 0)) {
      return res.status(400).json({ message: 'Error: Ningún turno válido fue seleccionado. Verifica los datos enviados.' });
    }

    const savedTablarol = new Tablarol(tablarolData);
    await savedTablarol.save();

    res.status(201).json(savedTablarol);
  } catch (error) {
    console.error('Error al crear el Tablarol:', error);
    res.status(400).json({ message: 'Error al crear el Tablarol', error: error.message });
  }
};

// Obtener todos los Tablaroles
exports.getTablaroles = async (req, res) => {
  try {
    const tablaroles = await Tablarol.find();
    console.log('Tablaroles encontrados:', tablaroles);
    res.status(200).json(tablaroles);
  } catch (error) {
    console.error('Error al obtener los Tablaroles:', error);
    res.status(400).json({ message: 'Error al obtener los Tablaroles', error: error.message });
  }
};

// Obtener un Tablarol por ID
exports.getTablarolById = async (req, res) => {
  try {
    console.log('ID recibido:', req.params.id);
    const tablarol = await Tablarol.findById(req.params.id);
    if (!tablarol) {
      console.log('Tablarol no encontrado con ID:', req.params.id);
      return res.status(404).json({ message: 'Tablarol no encontrado' });
    }
    console.log('Tablarol encontrado:', tablarol);
    res.status(200).json(tablarol);
  } catch (error) {
    console.error('Error al obtener el Tablarol:', error);
    res.status(400).json({ message: 'Error al obtener el Tablarol', error: error.message });
  }
};

// Actualizar un Tablarol
exports.updateTablarol = async (req, res) => {
  try {
    console.log('ID recibido para actualizar:', req.params.id);
    console.log('Datos recibidos para actualizar:', JSON.stringify(req.body, null, 2));

    // Procesamos las rutas para incluir "costo", "saleDe" y "llegaA"
    const updatedData = {
      ...req.body,
      rutas: req.body.rutas.map(ruta => ({
        numeroRuta: ruta.numeroRuta,
        nombreCliente: ruta.nombreCliente,
        costo: ruta.costo,
        saleDe: ruta.saleDe,
        llegaA: ruta.llegaA,
        turnos: (ruta.turnos || []).filter(turno =>
          turno.turno &&
          turno.horarioEntrada &&
          turno.horarioSalida &&
          turno.horarioinicio_jordana_salidaOrigen &&
          turno.horarioinicio_jornada_llegada_a_Destino &&
          turno.horariosalida_jornada_salida_de_Origen &&
          turno.horariosalida_jornada_llegada_a_Destino
        )
      }))
    };

    const updatedTablarol = await Tablarol.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedTablarol) {
      console.log('Tablarol no encontrado con ID:', req.params.id);
      return res.status(404).json({ message: 'Tablarol no encontrado' });
    }
    console.log('Tablarol actualizado:', updatedTablarol);
    res.status(200).json(updatedTablarol);
  } catch (error) {
    console.error('Error al actualizar el Tablarol:', error);
    res.status(400).json({ message: 'Error al actualizar el Tablarol', error: error.message });
  }
};

// Eliminar un Tablarol
exports.deleteTablarol = async (req, res) => {
  try {
    console.log('ID recibido para eliminar:', req.params.id);
    const deletedTablarol = await Tablarol.findByIdAndDelete(req.params.id);
    if (!deletedTablarol) {
      console.log('Tablarol no encontrado con ID:', req.params.id);
      return res.status(404).json({ message: 'Tablarol no encontrado' });
    }
    console.log('Tablarol eliminado:', deletedTablarol);
    res.status(200).json({ message: 'Tablarol eliminado' });
  } catch (error) {
    console.error('Error al eliminar el Tablarol:', error);
    res.status(400).json({ message: 'Error al eliminar el Tablarol', error: error.message });
  }
};
