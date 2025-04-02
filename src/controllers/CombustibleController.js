// controllers/CombustibleController.js
const Combustible = require('../models/combustible');

// Crear nuevo registro de combustible
exports.crearCombustible = async (req, res) => {
  try {
    const nuevoCombustible = new Combustible(req.body);
    const combustibleGuardado = await nuevoCombustible.save();
    res.status(201).json({
      success: true,
      data: combustibleGuardado,
      message: 'Registro de combustible creado exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: 'Error al crear registro de combustible'
    });
  }
};

// Obtener todos los registros de combustible
exports.obtenerCombustibles = async (req, res) => {
  try {
    const combustibles = await Combustible.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: combustibles.length,
      data: combustibles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error al obtener registros de combustible'
    });
  }
};

// Obtener un registro de combustible por ID
exports.obtenerCombustiblePorId = async (req, res) => {
  try {
    const combustible = await Combustible.findById(req.params.id);
    
    if (!combustible) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró registro de combustible con ese ID'
      });
    }
    
    res.status(200).json({
      success: true,
      data: combustible
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error al obtener registro de combustible'
    });
  }
};

// Actualizar un registro de combustible
exports.actualizarCombustible = async (req, res) => {
  try {
    const combustible = await Combustible.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!combustible) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró registro de combustible con ese ID'
      });
    }
    
    res.status(200).json({
      success: true,
      data: combustible,
      message: 'Registro de combustible actualizado exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      message: 'Error al actualizar registro de combustible'
    });
  }
};

// Eliminar un registro de combustible
exports.eliminarCombustible = async (req, res) => {
  try {
    const combustible = await Combustible.findByIdAndDelete(req.params.id);
    
    if (!combustible) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró registro de combustible con ese ID'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Registro de combustible eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Error al eliminar registro de combustible'
    });
  }
};