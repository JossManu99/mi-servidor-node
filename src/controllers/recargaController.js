const Recarga = require('../models/Recarga');

// Obtener todas las recargas
exports.getAllRecargas = async (req, res) => {
  try {
    const recargas = await Recarga.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: recargas.length, data: recargas });
  } catch (error) {
    console.error('Error al obtener las recargas:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};

// Obtener una recarga por ID
exports.getRecargaById = async (req, res) => {
  try {
    const recarga = await Recarga.findById(req.params.id);
    if (!recarga) {
      return res.status(404).json({ success: false, error: 'Recarga no encontrada' });
    }
    res.status(200).json({ success: true, data: recarga });
  } catch (error) {
    console.error('Error al obtener la recarga:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};

// Crear una nueva recarga
exports.createRecarga = async (req, res) => {
  try {
    const recarga = await Recarga.create(req.body);
    res.status(201).json({ success: true, data: recarga });
  } catch (error) {
    console.error('Error al crear la recarga:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};

// Actualizar una recarga
exports.updateRecarga = async (req, res) => {
  try {
    const recarga = await Recarga.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!recarga) {
      return res.status(404).json({ success: false, error: 'Recarga no encontrada' });
    }
    res.status(200).json({ success: true, data: recarga });
  } catch (error) {
    console.error('Error al actualizar la recarga:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
};

// Eliminar una recarga
exports.deleteRecarga = async (req, res) => {
  try {
    const recarga = await Recarga.findByIdAndDelete(req.params.id);
    if (!recarga) {
      return res.status(404).json({ success: false, error: 'Recarga no encontrada' });
    }
    res.status(200).json({ success: true, message: 'Recarga eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la recarga:', error);
    res.status(500).json({ success: false, error: 'Error del servidor' });
  }
  
};
