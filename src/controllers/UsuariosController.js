const User = require('../models/User');

// Crear un usuario
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    // Aquí podrías encriptar la contraseña u otras validaciones
    const newUser = await User.create(userData);
    return res.status(201).json({
      status: "success",
      user: newUser,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al crear el usuario",
      error: error.message || error,
    });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    // Excluye la contraseña y otros campos configurados con select: false
    const users = await User.find().select('-password');
    return res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al obtener los usuarios",
      error: error.message || error,
    });
  }
};

// Obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }
    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return res.status(500).json({
      status: "error",
      message: "Ocurrió un error al obtener el usuario",
      error: error.message || error,
    });
  }
};

// Actualizar un usuario por su ID
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    // Evita actualizar la contraseña directamente, si se desea
    if (updateData.password) delete updateData.password;
    const userUpdated = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!userUpdated) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado para actualizar",
      });
    }
    return res.status(200).json({
      status: "success",
      user: userUpdated,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el usuario",
      error: error.message || error,
    });
  }
};

// Eliminar un usuario por su ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDeleted = await User.findByIdAndDelete(userId);
    if (!userDeleted) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado para eliminar",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar el usuario",
      error: error.message || error,
    });
  }
};
