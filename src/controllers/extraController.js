const Extra = require('../models/Extra');

// Obtener todas las extras
exports.getExtras = async (req, res) => {
  try {
    const extras = await Extra.find();
    if (extras.length === 0) {
      return res.status(404).json({ message: 'No se encontraron extras' });
    }
    res.json(extras);
  } catch (error) {
    console.error('Error al obtener extras:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor', 
      error: error.message 
    });
  }
};

// Obtener una extra por su ID
exports.getExtraById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID de extra es requerido' });
    }
    const extra = await Extra.findById(req.params.id);
    if (!extra) {
      return res.status(404).json({ message: 'Extra no encontrada' });
    }
    res.json(extra);
  } catch (error) {
    console.error('Error al obtener extra por ID:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'ID de extra inválido', 
        error: error.message 
      });
    }
    res.status(500).json({ 
      message: 'Error interno del servidor', 
      error: error.message 
    });
  }
};

// Crear una nueva extra (estructura anidada: entrada y salida)
exports.createExtra = async (req, res) => {
  try {
    const { turno, entrada, salida } = req.body;
    console.log('Datos recibidos:', req.body);

    // Validar campos requeridos
    if (!turno) {
      return res.status(400).json({ message: 'El campo "turno" es requerido' });
    }
    if (!entrada || !entrada.horario || !entrada.rutaSalida || !entrada.rutaDestino) {
      return res.status(400).json({ 
        message: 'Datos de "entrada" incompletos. Se requieren: horario, rutaSalida y rutaDestino' 
      });
    }
    if (!salida || !salida.horario || !salida.rutaSalida || !salida.rutaDestino) {
      return res.status(400).json({ 
        message: 'Datos de "salida" incompletos. Se requieren: horario, rutaSalida y rutaDestino' 
      });
    }

    const newExtra = new Extra({ turno, entrada, salida });

    const validationError = newExtra.validateSync();
    if (validationError) {
      return res.status(400).json({ 
        message: 'Error de validación', 
        errores: validationError.errors 
      });
    }

    const savedExtra = await newExtra.save();
    res.status(201).json(savedExtra);
  } catch (error) {
    console.error('Error al crear extra:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Error de validación', 
        errores: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: 'Error interno del servidor', 
      error: error.message 
    });
  }
};

// Actualizar una extra existente
exports.updateExtra = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID de extra es requerido' });
    }
    const extra = await Extra.findById(req.params.id);
    if (!extra) {
      return res.status(404).json({ message: 'Extra no encontrada' });
    }

    // Actualizamos solo los campos que se hayan enviado
    const { turno, entrada, salida } = req.body;
    if (turno !== undefined) extra.turno = turno;
    if (entrada !== undefined) extra.entrada = { ...extra.entrada, ...entrada };
    if (salida !== undefined) extra.salida = { ...extra.salida, ...salida };

    const validationError = extra.validateSync();
    if (validationError) {
      return res.status(400).json({ 
        message: 'Error de validación', 
        errores: validationError.errors 
      });
    }

    const updatedExtra = await extra.save();
    res.json(updatedExtra);
  } catch (error) {
    console.error('Error al actualizar extra:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'ID de extra inválido', 
        error: error.message 
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Error de validación', 
        errores: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: 'Error interno del servidor', 
      error: error.message 
    });
  }
};

// Eliminar una extra
exports.deleteExtra = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'ID de extra es requerido' });
    }
    const extra = await Extra.findById(req.params.id);
    if (!extra) {
      return res.status(404).json({ message: 'Extra no encontrada' });
    }
    await Extra.findByIdAndDelete(req.params.id);
    res.json({ message: 'Extra eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar extra:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'ID de extra inválido', 
        error: error.message 
      });
    }
    res.status(500).json({ 
      message: 'Error interno del servidor', 
      error: error.message 
    });
  }
};
