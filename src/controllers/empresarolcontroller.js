const Empresarol = require('../models/RollRutas');

// Crear una nueva empresa con turnos y rutas
exports.createEmpresarol = async (req, res) => {
  try {
    // Verificar que los campos requeridos estén presentes
    console.log('Solicitud de creación recibida:', req.body);  // Depuración: Ver qué datos llegan
    const { empresarol, turnos, rutas, elaboradoPor } = req.body;

    if (!empresarol) {
      return res.status(400).json({ error: 'El campo "empresarol" es obligatorio' });
    }
    if (!turnos || turnos.length === 0) {
      return res.status(400).json({ error: 'El campo "turnos" es obligatorio y debe tener al menos un turno' });
    }
    if (!rutas || rutas.length === 0) {
      return res.status(400).json({ error: 'El campo "rutas" es obligatorio y debe tener al menos una ruta' });
    }
    if (!elaboradoPor) {
      return res.status(400).json({ error: 'Elaborado por es obligatorio' });
    }

    // Agregar la fecha de creación automáticamente
    const nuevaEmpresarol = new Empresarol({
      ...req.body,
      fechaCreacion: new Date(), // Se asigna la fecha actual
    });

    const empresarolGuardada = await nuevaEmpresarol.save();

    res.status(201).json(empresarolGuardada);
  } catch (error) {
    console.error('Error al crear empresa:', error);  // Depuración: Ver error
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las empresas
exports.getEmpresaroles = async (req, res) => {
  try {
    console.log('Obteniendo todas las empresas...');  // Depuración: Ver cuándo se hace la solicitud
    const empresaroles = await Empresarol.find();
    console.log('Empresas obtenidas:', empresaroles);  // Depuración: Ver los datos obtenidos
    res.status(200).json(empresaroles);
  } catch (error) {
    console.error('Error al obtener empresas:', error.message);  // Depuración: Ver errores al obtener
    res.status(500).json({ error: error.message });
  }
};

// Obtener una empresa por su ID
exports.getEmpresarolById = async (req, res) => {
  try {
    console.log('Obteniendo empresa con ID:', req.params.id);  // Depuración: Ver qué ID se solicita
    const empresarol = await Empresarol.findById(req.params.id);
    if (!empresarol) {
      console.log('Empresa no encontrada con ID:', req.params.id);  // Depuración: Ver qué ID no se encuentra
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    console.log('Empresa encontrada:', empresarol);  // Depuración: Ver los datos encontrados
    res.status(200).json(empresarol);
  } catch (error) {
    console.error('Error al obtener empresa por ID:', error.message);  // Depuración: Ver errores al obtener por ID
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una empresa por su ID
exports.updateEmpresarol = async (req, res) => {
  try {
    console.log('Actualizando empresa con ID:', req.params.id);  // Depuración: Ver qué ID se está actualizando
    const empresarolActualizada = await Empresarol.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empresarolActualizada) {
      console.log('Empresa no encontrada para actualización con ID:', req.params.id);  // Depuración: Ver qué ID no se encuentra
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    console.log('Empresa actualizada:', empresarolActualizada);  // Depuración: Ver los datos actualizados
    res.status(200).json(empresarolActualizada);
  } catch (error) {
    console.error('Error al actualizar empresa:', error.message);  // Depuración: Ver errores al actualizar
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una empresa por su ID
exports.deleteEmpresarol = async (req, res) => {
  try {
    console.log('Eliminando empresa con ID:', req.params.id);  // Depuración: Ver qué ID se está eliminando
    const empresarolEliminada = await Empresarol.findByIdAndDelete(req.params.id);
    if (!empresarolEliminada) {
      console.log('Empresa no encontrada para eliminación con ID:', req.params.id);  // Depuración: Ver qué ID no se encuentra
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    console.log('Empresa eliminada:', empresarolEliminada);  // Depuración: Ver los datos eliminados
    res.status(200).json({ message: 'Empresa eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar empresa:', error.message);  // Depuración: Ver errores al eliminar
    res.status(500).json({ error: error.message });
  }
};
