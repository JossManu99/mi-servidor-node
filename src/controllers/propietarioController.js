const Propietario = require('../models/propietario');  

// Crear un nuevo propietario
const crearPropietario = async (req, res) => {
  try {
    const propietario = new Propietario(req.body);
    
    // DEBUGGING: Log completo de datos recibidos
    console.log('Datos recibidos:', req.body);
    
    const nuevoPropietario = await propietario.save();
    
    // DEBUGGING: Log del propietario guardado
    console.log('Propietario guardado:', nuevoPropietario);
    
    res.status(201).json(nuevoPropietario);
  } catch (error) {
    // DEBUGGING: Log detallado del error
    console.error('Error completo:', error);
    
    // DEBUGGING: Mensaje más específico del error
    res.status(400).json({ 
      error: error.message,
      // Agregar detalles adicionales del error
      errorNombre: error.name,
      errorCodigo: error.code,
      errorDetalles: error.errors ? Object.keys(error.errors) : null
    });
  }
};

// Obtener todos los propietarios
const obtenerPropietarios = async (req, res) => {
  try {
    // DEBUGGING: Log de la consulta
    console.log('Buscando propietarios');
    
    const propietarios = await Propietario.find();
    
    // DEBUGGING: Log de propietarios encontrados
    console.log('Propietarios encontrados:', propietarios.length);
    
    res.status(200).json(propietarios);
  } catch (error) {
    // DEBUGGING: Log detallado del error
    console.error('Error en obtener propietarios:', error);
    
    res.status(500).json({ error: error.message });
  }
};

// Obtener un propietario por ID
const obtenerPropietarioPorId = async (req, res) => {
  try {
    // DEBUGGING: Log del ID recibido
    console.log('ID recibido:', req.params.id);
    
    const propietario = await Propietario.findById(req.params.id);
    
    // DEBUGGING: Log del resultado de la búsqueda
    console.log('Propietario encontrado:', propietario);
    
    if (!propietario) {
      return res.status(404).json({ message: 'Propietario no encontrado' });
    }
    res.status(200).json(propietario);
  } catch (error) {
    // DEBUGGING: Log detallado del error
    console.error('Error en obtener propietario por ID:', error);
    
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un propietario por ID
const actualizarPropietario = async (req, res) => {
  try {
    // DEBUGGING: Log de datos recibidos para actualización
    console.log('ID a actualizar:', req.params.id);
    console.log('Datos para actualización:', req.body);
    
    const propietarioActualizado = await Propietario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    // DEBUGGING: Log del resultado de actualización
    console.log('Propietario actualizado:', propietarioActualizado);
    
    if (!propietarioActualizado) {
      return res.status(404).json({ message: 'Propietario no encontrado' });
    }
    res.status(200).json(propietarioActualizado);
  } catch (error) {
    // DEBUGGING: Log detallado del error
    console.error('Error en actualizar propietario:', error);
    
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un propietario por ID
const eliminarPropietario = async (req, res) => {
  try {
    // DEBUGGING: Log del ID a eliminar
    console.log('ID a eliminar:', req.params.id);
    
    const propietarioEliminado = await Propietario.findByIdAndDelete(req.params.id);
    
    // DEBUGGING: Log del resultado de eliminación
    console.log('Propietario eliminado:', propietarioEliminado);
    
    if (!propietarioEliminado) {
      return res.status(404).json({ message: 'Propietario no encontrado' });
    }
    res.status(200).json({ message: 'Propietario eliminado correctamente' });
  } catch (error) {
    // DEBUGGING: Log detallado del error
    console.error('Error en eliminar propietario:', error);
    
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearPropietario,
  obtenerPropietarios,
  obtenerPropietarioPorId,
  actualizarPropietario,
  eliminarPropietario,
};