// controllers/tablaRolTbfController.js

const TablaRolTbf = require('../models/TablaRolTBF');

// Obtener todas las tablas de rol TBF
exports.getAllTablaRolTbf = async (req, res) => {
  try {
    console.log('Iniciando getAllTablaRolTbf');
    const tablasRolTbf = await TablaRolTbf.find();
    console.log('Tablas encontradas:', tablasRolTbf.length);
    res.status(200).json(tablasRolTbf);
  } catch (error) {
    console.error('Error en getAllTablaRolTbf:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// Obtener una tabla de rol TBF por ID
exports.getTablaRolTbfById = async (req, res) => {
  try {
    console.log('Iniciando getTablaRolTbfById con ID:', req.params.id);
    if (!req.params.id) {
      console.log('ID no proporcionado');
      return res.status(400).json({ message: 'Se requiere un ID válido' });
    }
    const tablaRolTbf = await TablaRolTbf.findById(req.params.id);
    console.log('Resultado de búsqueda:', tablaRolTbf);
    if (!tablaRolTbf) {
      return res.status(404).json({ message: 'Tabla de rol TBF no encontrada' });
    }
    res.status(200).json(tablaRolTbf);
  } catch (error) {
    console.error('Error en getTablaRolTbfById:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// Crear una nueva tabla de rol TBF
exports.createTablaRolTbf = async (req, res) => {
  try {
    console.log('Iniciando createTablaRolTbf con datos:', req.body);
    
    // Validación de entrada
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Datos no proporcionados' });
    }
    
    // Procesamos cada ruta para asegurar que se incluyan "costo", "saleDe" y "llegaA"
    const rutasProcesadas = (req.body.rutas || []).map(ruta => ({
      ...ruta,
      costo: ruta.costo,
      saleDe: ruta.saleDe,
      llegaA: ruta.llegaA,
      turnos: ruta.turnos || []
    }));
    
    const nuevaTablaRolTbf = new TablaRolTbf({
      ...req.body,
      rutas: rutasProcesadas
    });
    
    console.log('Objeto creado:', nuevaTablaRolTbf);
    const tablaRolTbfGuardada = await nuevaTablaRolTbf.save();
    console.log('Tabla guardada:', tablaRolTbfGuardada);
    res.status(201).json(tablaRolTbfGuardada);
  } catch (error) {
    console.error('Error en createTablaRolTbf:', error);
    res.status(400).json({ 
      message: error.message, 
      stack: error.stack,
      validationErrors: error.errors
    });
  }
};

// Actualizar una tabla de rol TBF
exports.updateTablaRolTbf = async (req, res) => {
  try {
    console.log('Iniciando updateTablaRolTbf con ID:', req.params.id);
    console.log('Datos de actualización:', req.body);
    
    if (!req.params.id) {
      return res.status(400).json({ message: 'Se requiere un ID válido' });
    }
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Datos no proporcionados para actualizar' });
    }
    
    // Procesamos las rutas del body para incluir "costo", "saleDe" y "llegaA"
    const rutasProcesadas = (req.body.rutas || []).map(ruta => ({
      ...ruta,
      costo: ruta.costo,
      saleDe: ruta.saleDe,
      llegaA: ruta.llegaA,
      turnos: ruta.turnos || []
    }));
    
    const datosActualizados = {
      ...req.body,
      rutas: rutasProcesadas
    };
    
    const tablaRolTbfActualizada = await TablaRolTbf.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true, runValidators: true }
    );
    
    console.log('Resultado de actualización:', tablaRolTbfActualizada);
    if (!tablaRolTbfActualizada) {
      return res.status(404).json({ message: 'Tabla de rol TBF no encontrada' });
    }
    res.status(200).json(tablaRolTbfActualizada);
  } catch (error) {
    console.error('Error en updateTablaRolTbf:', error);
    res.status(400).json({ 
      message: error.message, 
      stack: error.stack,
      validationErrors: error.errors
    });
  }
};

// Eliminar una tabla de rol TBF
exports.deleteTablaRolTbf = async (req, res) => {
  try {
    console.log('Iniciando deleteTablaRolTbf con ID:', req.params.id);
    
    if (!req.params.id) {
      return res.status(400).json({ message: 'Se requiere un ID válido' });
    }
    
    const tablaRolTbfEliminada = await TablaRolTbf.findByIdAndDelete(req.params.id);
    console.log('Resultado de eliminación:', tablaRolTbfEliminada);
    if (!tablaRolTbfEliminada) {
      return res.status(404).json({ message: 'Tabla de rol TBF no encontrada' });
    }
    res.status(200).json({ 
      message: 'Tabla de rol TBF eliminada correctamente', 
      datos: tablaRolTbfEliminada 
    });
  } catch (error) {
    console.error('Error en deleteTablaRolTbf:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// Buscar tablas de rol por criterios específicos
exports.searchTablaRolTbf = async (req, res) => {
  try {
    console.log('Iniciando searchTablaRolTbf con filtros:', req.query);
    const filtros = {};
    
    if (req.query.numeroCambio) {
      filtros.numeroCambio = req.query.numeroCambio;
    }
    if (req.query.mesInicio) {
      filtros.mesInicio = req.query.mesInicio;
    }
    if (req.query.anioInicio) {
      filtros.anioInicio = req.query.anioInicio;
    }
    if (req.query.elaboradoPor) {
      filtros.elaboradoPor = { $regex: req.query.elaboradoPor, $options: 'i' };
    }
    if (req.query.nombreCliente) {
      filtros['rutas.nombreCliente'] = { $regex: req.query.nombreCliente, $options: 'i' };
    }
    if (req.query.numeroRuta) {
      filtros['rutas.numeroRuta'] = req.query.numeroRuta;
    }
    
    console.log('Filtros aplicados:', filtros);
    const tablasRolTbf = await TablaRolTbf.find(filtros);
    console.log('Resultados encontrados:', tablasRolTbf.length);
    res.status(200).json(tablasRolTbf);
  } catch (error) {
    console.error('Error en searchTablaRolTbf:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// Obtener todas las tablas de rol por cliente
exports.getTablasByCliente = async (req, res) => {
  try {
    console.log('Iniciando getTablasByCliente con cliente:', req.params.cliente);
    if (!req.params.cliente) {
      return res.status(400).json({ message: 'Se requiere especificar un cliente' });
    }
    const tablasRolTbf = await TablaRolTbf.find({
      'rutas.nombreCliente': { $regex: req.params.cliente, $options: 'i' }
    });
    console.log('Tablas encontradas para el cliente:', tablasRolTbf.length);
    if (tablasRolTbf.length === 0) {
      return res.status(404).json({ message: 'No se encontraron tablas para el cliente especificado' });
    }
    res.status(200).json(tablasRolTbf);
  } catch (error) {
    console.error('Error en getTablasByCliente:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// Obtener estadísticas de las tablas de rol
exports.getEstadisticasTablaRol = async (req, res) => {
  try {
    console.log('Iniciando getEstadisticasTablaRol');
    const totalTablas = await TablaRolTbf.countDocuments();
    const tablasPorMes = await TablaRolTbf.aggregate([
      { $group: { _id: '$mesInicio', cantidad: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    const totalRutas = await TablaRolTbf.aggregate([
      { $unwind: '$rutas' },
      { $count: 'total' }
    ]);
    const clientesUnicos = await TablaRolTbf.aggregate([
      { $unwind: '$rutas' },
      { $group: { _id: '$rutas.nombreCliente' } },
      { $count: 'total' }
    ]);
    const rutasPorCliente = await TablaRolTbf.aggregate([
      { $unwind: '$rutas' },
      { $group: { _id: '$rutas.nombreCliente', cantidad: { $sum: 1 } } },
      { $sort: { cantidad: -1 } }
    ]);
    
    const estadisticas = {
      totalTablas,
      tablasPorMes,
      totalRutas: totalRutas.length > 0 ? totalRutas[0].total : 0,
      clientesUnicos: clientesUnicos.length > 0 ? clientesUnicos[0].total : 0,
      rutasPorCliente
    };
    
    console.log('Estadísticas generadas:', estadisticas);
    res.status(200).json(estadisticas);
  } catch (error) {
    console.error('Error en getEstadisticasTablaRol:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};
