// authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const validate = require('../helpers/validate');
const jwt = require('../helpers/jwt');

exports.register = async (req, res) => {
  try {
    console.log("Datos recibidos en registro:", req.body);
    const params = req.body;
    
    // Verificar que se hayan enviado los campos obligatorios
    if (!params.name || !params.nick || !params.email || !params.password) {
      console.error("Faltan datos por enviar:", params);
      return res.status(400).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    // Validar parámetros
    try {
      validate(params);
    } catch (validationError) {
      console.error("Error en la validación:", validationError);
      return res.status(400).send({
        status: "error",
        message: "No se ha superado la validación",
        error: validationError.message || validationError,
      });
    }

    // Verificar si ya existe un usuario con el mismo email o nick
    const existingUser = await User.findOne({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    });

    if (existingUser) {
      if (existingUser.email === params.email.toLowerCase()) {
        console.error("El email ya está en uso:", params.email);
        return res.status(400).send({
          status: "error",
          message: "El email ya está en uso",
        });
      } else {
        console.error("El nick ya está en uso:", params.nick);
        return res.status(400).send({
          status: "error",
          message: "El nick ya está en uso",
        });
      }
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(params.password, 10);
    params.password = hashedPassword;
    // Convertir email y nick a minúsculas
    params.email = params.email.toLowerCase();
    params.nick = params.nick.toLowerCase();

    // Crear el usuario (si no se envía el role, se usará el default definido en el modelo)
    const user = new User(params);
    const userStored = await user.save();

    let userCreate = userStored.toObject();
    delete userCreate.password; // eliminar la contraseña de la respuesta

    console.log("Usuario registrado exitosamente:", userCreate);

    return res.status(200).send({
      status: "success",
      message: "Usuario registrado correctamente",
      user: userCreate,
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).send({
      status: "error",
      message: "Ocurrió un error al registrar el usuario",
      error: error.message || error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("Datos recibidos en login:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        status: "error",
        message: "Faltan datos para el login",
      });
    }

    // Buscar usuario y seleccionar password y role
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password +role');
    if (!user) {
      return res.status(400).send({
        status: "error",
        message: "No se encontró el usuario",
      });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({
        status: "error",
        message: "Contraseña incorrecta",
      });
    }

    // Generar token
    const token = jwt.createToken(user);

    console.log("Login exitoso para el usuario:", user.nick);
    return res.status(200).send({
      status: "success",
      token,
      user: {
        id: user._id,
        name: user.name,
        nick: user.nick,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).send({
      status: "error",
      message: "Ocurrió un error durante el login",
      error: error.message || error,
    });
  }
};

exports.profile = async (req, res) => {
  try {
    // Se asume que el middleware de autenticación añade `req.user` con el id del usuario en `sub`
    const userId = req.user.sub;
    console.log("Obteniendo profile para el usuario:", userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado",
      });
    }
    return res.status(200).send({
      status: "success",
      user,
    });
  } catch (error) {
    console.error("Error en profile:", error);
    return res.status(500).send({
      status: "error",
      message: "Ocurrió un error al obtener el perfil",
      error: error.message || error,
    });
  }
};

exports.update = async (req, res) => {
  try {
    // Se asume que el middleware de autenticación añade `req.user` con el id del usuario en `sub`
    const userId = req.user.sub;
    const updateData = req.body;

    console.log("Datos para actualizar el usuario:", userId, updateData);

    // Puedes quitar campos que no se deben actualizar, por ejemplo:
    delete updateData.password; // Si no deseas actualizar la contraseña desde este endpoint

    const userUpdated = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!userUpdated) {
      return res.status(404).send({
        status: "error",
        message: "No se encontró el usuario a actualizar",
      });
    }
    console.log("Usuario actualizado:", userUpdated);
    return res.status(200).send({
      status: "success",
      user: userUpdated,
    });
  } catch (error) {
    console.error("Error en update:", error);
    return res.status(500).send({
      status: "error",
      message: "Ocurrió un error al actualizar el usuario",
      error: error.message || error,
    });
  }
};
