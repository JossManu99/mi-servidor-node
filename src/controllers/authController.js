const bcrypt = require('bcryptjs');
const User = require('../models/User');
const validate = require('../helpers/validate');
const jwt = require('../helpers/jwt');

/** ----------------------------
 *  MÉTODOS DE AUTENTICACIÓN
 *  ----------------------------*/

/**
 * Registra un nuevo usuario.
 */
exports.register = async (req, res) => {
  try {
    // Mostrar datos recibidos en el request
    console.log("DEBUG: Datos recibidos en registro:", req.body);
    const params = req.body;

    // Verificar campos obligatorios
    if (!params.name || !params.nick || !params.email || !params.password) {
      console.error("DEBUG: Faltan datos por enviar:", params);
      return res.status(400).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    // Validar parámetros
    try {
      validate(params);
    } catch (validationError) {
      console.error("DEBUG: Error en la validación:", validationError);
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
    console.log("DEBUG: Resultado búsqueda usuario existente:", existingUser);

    if (existingUser) {
      if (existingUser.email === params.email.toLowerCase()) {
        console.error("DEBUG: El email ya está en uso:", params.email);
        return res.status(400).send({
          status: "error",
          message: "El email ya está en uso",
        });
      } else {
        console.error("DEBUG: El nick ya está en uso:", params.nick);
        return res.status(400).send({
          status: "error",
          message: "El nick ya está en uso",
        });
      }
    }

    // Encriptar la contraseña y convertir email/nick a minúsculas
    const hashedPassword = await bcrypt.hash(params.password, 10);
    params.password = hashedPassword;
    params.email = params.email.toLowerCase();
    params.nick = params.nick.toLowerCase();

    // Mostrar parámetros antes de crear el usuario
    console.log("DEBUG: Datos para guardar usuario:", params);

    // Crear el usuario (se usará el role definido por defecto en el modelo si no se envía)
    const user = new User(params);
    const userStored = await user.save();

    // Convertir el usuario a objeto y eliminar la contraseña antes de la respuesta
    let userCreate = userStored.toObject();
    delete userCreate.password;

    // Mostrar datos guardados en la consola
    console.log("DEBUG: Usuario registrado exitosamente:", userCreate);

    return res.status(200).send({
      status: "success",
      message: "Usuario registrado correctamente",
      user: userCreate,
    });
  } catch (error) {
    console.error("DEBUG: Error en el registro:", error);
    return res.status(500).send({
      status: "error",
      message: "Ocurrió un error al registrar el usuario",
      error: error.message || error,
    });
  }
};

/**
 * Login de usuario.
 */
exports.login = async (req, res) => {
  try {
    console.log("DEBUG: Datos recibidos en login:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      console.error("DEBUG: Faltan datos para el login");
      return res.status(400).send({
        status: "error",
        message: "Faltan datos para el login",
      });
    }

    // Buscar usuario y seleccionar password y role
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password +role');
    console.log("DEBUG: Usuario encontrado en login:", user);
    if (!user) {
      console.error("DEBUG: No se encontró el usuario con email:", email);
      return res.status(400).send({
        status: "error",
        message: "No se encontró el usuario",
      });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.error("DEBUG: Contraseña incorrecta para el usuario:", user.nick);
      return res.status(400).send({
        status: "error",
        message: "Contraseña incorrecta",
      });
    }

    // Generar token
    const token = jwt.createToken(user);
    console.log("DEBUG: Login exitoso para el usuario:", user.nick);
    
    // Mostrar los datos que se enviarán en la respuesta
    const responseUser = {
      id: user._id,
      name: user.name,
      nick: user.nick,
      email: user.email,
      role: user.role,
    };
    console.log("DEBUG: Datos de respuesta en login:", responseUser);

    return res.status(200).send({
      status: "success",
      token,
      user: responseUser,
    });
  } catch (error) {
    console.error("DEBUG: Error en el login:", error);
    return res.status(500).send({
      status: "error",
      message: "Ocurrió un error durante el login",
      error: error.message || error,
    });
  }
};

/**
 * Obtener perfil del usuario autenticado.
 * Se asume que un middleware de autenticación añade `req.user` con el id en `sub`.
 */
exports.profile = async (req, res) => {
  try {
    const userId = req.user.sub;
    console.log("DEBUG: Obteniendo profile para el usuario con ID:", userId);
    const user = await User.findById(userId);
    console.log("DEBUG: Usuario encontrado en profile:", user);
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
    console.error("DEBUG: Error en profile:", error);
    return res.status(500).send({
      status: "error",
      message: "Ocurrió un error al obtener el perfil",
      error: error.message || error,
    });
  }
};

/**
 * Actualizar datos del usuario autenticado.
 */
exports.update = async (req, res) => {
  try {
    const userId = req.user.sub;
    const updateData = req.body;
    console.log("DEBUG: Datos para actualizar el usuario:", userId, updateData);

    // Evitar actualizar la contraseña desde este endpoint
    if (updateData.password) {
      console.warn("DEBUG: Se recibió una contraseña para actualizar; se eliminará.");
      delete updateData.password;
    }

    const userUpdated = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!userUpdated) {
      console.error("DEBUG: No se encontró el usuario a actualizar con ID:", userId);
      return res.status(404).send({
        status: "error",
        message: "No se encontró el usuario a actualizar",
      });
    }
    console.log("DEBUG: Usuario actualizado:", userUpdated);

    return res.status(200).send({
      status: "success",
      user: userUpdated,
    });
  } catch (error) {
    console.error("DEBUG: Error en update:", error);
    return res.status(500).send({
      status: "error",
      message: "Ocurrió un error al actualizar el usuario",
      error: error.message || error,
    });
  }
};

/** ----------------------------
 *  MÉTODOS CRUD DE USUARIOS (ADMIN)
 *  ----------------------------*/

/**
 * Crear un usuario (método de administración).
 */
exports.createUser = async (req, res) => {
  try {
    console.log("DEBUG: Datos recibidos en createUser:", req.body);
    const userData = req.body;
    // Aquí podrías encriptar la contraseña u otras validaciones si se requiere
    const newUser = await User.create(userData);
    console.log("DEBUG: Usuario creado por admin:", newUser);
    return res.status(201).json({
      status: "success",
      user: newUser,
    });
  } catch (error) {
    console.error("DEBUG: Error al crear el usuario:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al crear el usuario",
      error: error.message || error,
    });
  }
};

/**
 * Obtener todos los usuarios (excluyendo la contraseña).
 */
exports.getUsers = async (req, res) => {
  try {
    console.log("DEBUG: Solicitando obtener todos los usuarios.");
    const users = await User.find().select('-password');
    console.log("DEBUG: Usuarios obtenidos:", users);
    return res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    console.error("DEBUG: Error al obtener usuarios:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al obtener los usuarios",
      error: error.message || error,
    });
  }
};

/**
 * Obtener un usuario por su ID (excluyendo la contraseña).
 */
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("DEBUG: Buscando usuario por ID:", userId);
    const user = await User.findById(userId).select('-password');
    console.log("DEBUG: Usuario encontrado:", user);
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
    console.error("DEBUG: Error al obtener el usuario:", error);
    return res.status(500).json({
      status: "error",
      message: "Ocurrió un error al obtener el usuario",
      error: error.message || error,
    });
  }
};

/**
 * Actualizar un usuario por su ID (método de administración).
 */
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    console.log("DEBUG: Datos recibidos para actualizar el usuario por admin:", userId, updateData);

    // Evitar actualizar la contraseña directamente, si se desea
    if (updateData.password) {
      console.warn("DEBUG: Se recibió una contraseña en updateUser; se eliminará.");
      delete updateData.password;
    }

    const userUpdated = await User.findByIdAndUpdate(userId, updateData, { new: true });
    console.log("DEBUG: Usuario actualizado por admin:", userUpdated);
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
    console.error("DEBUG: Error al actualizar el usuario por admin:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el usuario",
      error: error.message || error,
    });
  }
};

/**
 * Eliminar un usuario por su ID (método de administración).
 */
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("DEBUG: Solicitud de eliminar usuario con ID:", userId);
    const userDeleted = await User.findByIdAndDelete(userId);
    if (!userDeleted) {
      console.error("DEBUG: Usuario no encontrado para eliminar:", userId);
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado para eliminar",
      });
    }
    console.log("DEBUG: Usuario eliminado:", userDeleted);
    return res.status(200).json({
      status: "success",
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.error("DEBUG: Error al eliminar el usuario:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar el usuario",
      error: error.message || error,
    });
  }
};
