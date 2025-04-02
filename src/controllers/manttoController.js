const Mantenimiento = require('../models/Mantto');

// Obtener todos los registros de mantenimiento
exports.getAllMantenimientos = async (req, res) => {
  try {
    const mantenimientos = await Mantenimiento.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: mantenimientos.length,
      data: mantenimientos
    });
  } catch (error) {
    console.error('Error al obtener registros de mantenimiento:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Obtener un registro de mantenimiento por ID
exports.getMantenimientoById = async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findById(req.params.id);
    if (!mantenimiento) {
      return res.status(404).json({
        success: false,
        error: 'Registro de mantenimiento no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: mantenimiento
    });
  } catch (error) {
    console.error('Error al obtener registro de mantenimiento:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'ID de registro inválido'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Crear un nuevo registro de mantenimiento
exports.createMantenimiento = async (req, res) => {
  try {
    // Transformar y filtrar las refacciones
    if (req.body.refacciones && req.body.refacciones.length > 0) {
      req.body.refacciones = req.body.refacciones
        .map((r) => {
          // Si viene con nombreRefaccion y no tiene nombre, lo asignamos a nombre
          if (r.nombreRefaccion && !r.nombre) {
            r.nombre = r.nombreRefaccion;
          }
          // Si viene con costoTotal y no tiene costo, lo asignamos a costo (convertido a número)
          if (r.costoTotal && !r.costo) {
            r.costo = parseFloat(r.costoTotal);
          }
          // Convertir a número para asegurar que se sume correctamente
          r.costo = parseFloat(r.costo || 0);
          return r;
        })
        // Filtrar para descartar refacciones incompletas
        .filter((r) => r.nombre && r.nombre.trim() !== '' && r.costo > 0);
    } else {
      req.body.refacciones = [];
    }

    // Calcular el total si no se proporciona
    if (!req.body.total) {
      req.body.total = req.body.refacciones.reduce(
        (sum, item) => sum + (item.costo || 0),
        0
      );
    }

    const mantenimiento = await Mantenimiento.create(req.body);
    res.status(201).json({
      success: true,
      data: mantenimiento
    });
  } catch (error) {
    console.error('Error al crear registro de mantenimiento:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Actualizar un registro de mantenimiento
exports.updateMantenimiento = async (req, res) => {
  try {
    // Transformar y filtrar las refacciones, de existir
    if (req.body.refacciones && req.body.refacciones.length > 0) {
      req.body.refacciones = req.body.refacciones
        .map((r) => {
          if (r.nombreRefaccion && !r.nombre) {
            r.nombre = r.nombreRefaccion;
          }
          if (r.costoTotal && !r.costo) {
            r.costo = parseFloat(r.costoTotal);
          }
          r.costo = parseFloat(r.costo || 0);
          return r;
        })
        .filter((r) => r.nombre && r.nombre.trim() !== '' && r.costo > 0);

      // Recalcular total
      req.body.total = req.body.refacciones.reduce(
        (sum, item) => sum + (item.costo || 0),
        0
      );
    }

    const mantenimiento = await Mantenimiento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!mantenimiento) {
      return res.status(404).json({
        success: false,
        error: 'Registro de mantenimiento no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: mantenimiento
    });
  } catch (error) {
    console.error('Error al actualizar registro de mantenimiento:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'ID de registro inválido'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Eliminar un registro de mantenimiento
exports.deleteMantenimiento = async (req, res) => {
  try {
    const mantenimiento = await Mantenimiento.findByIdAndDelete(req.params.id);
    if (!mantenimiento) {
      return res.status(404).json({
        success: false,
        error: 'Registro de mantenimiento no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Registro de mantenimiento eliminado correctamente',
      data: {}
    });
  } catch (error) {
    console.error('Error al eliminar registro de mantenimiento:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'ID de registro inválido'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Obtener registros de mantenimiento por rango de fechas
exports.getMantenimientosByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    const mantenimientos = await Mantenimiento.find({
      createdAt: { $gte: start, $lte: end }
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: mantenimientos.length,
      data: mantenimientos
    });
  } catch (error) {
    console.error('Error al obtener registros por fecha:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Obtener registros de mantenimiento por número económico
exports.getMantenimientosByNumeroEconomico = async (req, res) => {
  try {
    const { numeroEconomico } = req.params;
    const mantenimientos = await Mantenimiento.find({
      numeroEconomico: numeroEconomico
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: mantenimientos.length,
      data: mantenimientos
    });
  } catch (error) {
    console.error('Error al obtener registros por número económico:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Obtener registros de mantenimiento por operador
exports.getMantenimientosByOperador = async (req, res) => {
  try {
    const { nombreOperador } = req.params;
    const mantenimientos = await Mantenimiento.find({
      nombreOperador: nombreOperador
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: mantenimientos.length,
      data: mantenimientos
    });
  } catch (error) {
    console.error('Error al obtener registros por operador:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};

// Generar reporte de mantenimientos
exports.getMantenimientosReport = async (req, res) => {
  try {
    const { startDate, endDate, numeroEconomico } = req.query;
    let query = {};
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: start, $lte: end };
    }
    if (numeroEconomico) {
      query.numeroEconomico = numeroEconomico;
    }
    const mantenimientos = await Mantenimiento.find(query).sort({ createdAt: -1 });
    const totalCost = mantenimientos.reduce(
      (sum, record) => sum + record.total,
      0
    );
    const autobusesServiced = [
      ...new Set(mantenimientos.map((record) => record.numeroEconomico))
    ];
    res.status(200).json({
      success: true,
      count: mantenimientos.length,
      totalCost,
      autobusesServiced: autobusesServiced.length,
      data: mantenimientos
    });
  } catch (error) {
    console.error('Error al generar reporte:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
    });
  }
};
