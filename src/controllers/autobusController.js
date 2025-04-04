const Bus = require('../models/Autobus'); // Asegúrate de que este es el modelo correcto
const multer = require('multer');
const cloudinary = require('../../conexion db/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Función para subir archivos a Cloudinary
const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error("Error al subir a Cloudinary:", error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(fileBuffer);
  });
};

// Crear un autobús
// Crear un autobús
exports.createBus = async (req, res) => {
  try {
    console.log("Datos recibidos en el cuerpo de la solicitud:", req.body);

    upload.fields([
      { name: 'verificacionContaminante', maxCount: 1 },
      { name: 'verificacionFisicoMecanico', maxCount: 1 },
      { name: 'seguro', maxCount: 1 },
      { name: 'permiso', maxCount: 1 },
      { name: 'foto', maxCount: 1 },
      { name: 'tarjetaCirculacion', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        console.error("Error de Multer:", err);
        return res.status(400).json({ message: 'Error al subir los archivos', error: err });
      }

      try {
        const fileUrls = {};

        if (req.files.verificacionContaminante) {
          fileUrls.verificacionContaminante = await uploadToCloudinary(req.files.verificacionContaminante[0].buffer);
        }
        if (req.files.verificacionFisicoMecanico) {
          fileUrls.verificacionFisicoMecanico = await uploadToCloudinary(req.files.verificacionFisicoMecanico[0].buffer);
        }
        if (req.files.seguro) {
          fileUrls.seguro = await uploadToCloudinary(req.files.seguro[0].buffer);
        }
        if (req.files.permiso) {
          fileUrls.permiso = await uploadToCloudinary(req.files.permiso[0].buffer);
        }
        if (req.files.foto) {
          fileUrls.foto = await uploadToCloudinary(req.files.foto[0].buffer);
        }
        if (req.files.tarjetaCirculacion) {
          fileUrls.tarjetaCirculacion = await uploadToCloudinary(req.files.tarjetaCirculacion[0].buffer);
        }

        const bus = new Bus({
          ...req.body, // Incluye todos los campos no relacionados con archivos
          ...fileUrls, // Incluye las URLs de los archivos subidos
        });

        await bus.save();
        return res.status(201).json({ message: 'Bus creado', bus });
      } catch (error) {
        console.error("Error al crear el bus:", error);
        return res.status(500).json({ message: 'Error al crear el bus', error });
      }
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ message: 'Error al crear el bus', error });
  }
};


// Obtener todos los autobuses
exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los buses', error });
  }
};

// Obtener un autobús por ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus no encontrado' });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el bus', error });
  }
};

// Actualizar un autobús
// Actualizar un autobús
exports.updateBus = async (req, res) => {
  try {
    console.log('Datos recibidos para actualizar el autobús:', req.body);

    // Usa upload.fields y, en caso de que no se envíen archivos, maneja req.files de forma segura.
    upload.fields([
      { name: 'verificacionContaminante', maxCount: 1 },
      { name: 'verificacionFisicoMecanico', maxCount: 1 },
      { name: 'seguro', maxCount: 1 },
      { name: 'permiso', maxCount: 1 },
      { name: 'foto', maxCount: 1 },
      { name: 'tarjetaCirculacion', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        console.error("Error de Multer:", err);
        return res.status(400).json({ message: 'Error al subir los archivos', error: err });
      }

      try {
        // Aseguramos que req.files existe
        const files = req.files || {};
        const fileUrls = {};

        if (files.verificacionContaminante && files.verificacionContaminante.length > 0) {
          fileUrls.verificacionContaminante = await uploadToCloudinary(files.verificacionContaminante[0].buffer);
        }
        if (files.verificacionFisicoMecanico && files.verificacionFisicoMecanico.length > 0) {
          fileUrls.verificacionFisicoMecanico = await uploadToCloudinary(files.verificacionFisicoMecanico[0].buffer);
        }
        if (files.seguro && files.seguro.length > 0) {
          fileUrls.seguro = await uploadToCloudinary(files.seguro[0].buffer);
        }
        if (files.permiso && files.permiso.length > 0) {
          fileUrls.permiso = await uploadToCloudinary(files.permiso[0].buffer);
        }
        if (files.foto && files.foto.length > 0) {
          fileUrls.foto = await uploadToCloudinary(files.foto[0].buffer);
        }
        if (files.tarjetaCirculacion && files.tarjetaCirculacion.length > 0) {
          fileUrls.tarjetaCirculacion = await uploadToCloudinary(files.tarjetaCirculacion[0].buffer);
        }

        // Construye el objeto de datos a actualizar, validando las fechas
        const updatedData = {};

        if (req.body.numeroEconomico) updatedData.numeroEconomico = req.body.numeroEconomico;
        if (req.body.numeroMotor) updatedData.numeroMotor = req.body.numeroMotor;
        if (req.body.numeroSerie) updatedData.numeroSerie = req.body.numeroSerie;
        if (req.body.marca) updatedData.marca = req.body.marca;
        if (req.body.modelo) updatedData.modelo = req.body.modelo;
        if (req.body.tipoPlaca) updatedData.tipoPlaca = req.body.tipoPlaca;

        // Para las fechas, valida que el valor sea convertible a fecha válida
        if (req.body.caducidadTarjetaCirculacion) {
          const d = new Date(req.body.caducidadTarjetaCirculacion);
          if (!isNaN(d.getTime())) updatedData.caducidadTarjetaCirculacion = d;
        }
        if (req.body.caducidadVerificacionContaminante) {
          const d = new Date(req.body.caducidadVerificacionContaminante);
          if (!isNaN(d.getTime())) updatedData.caducidadVerificacionContaminante = d;
        }
        if (req.body.caducidadVerificacionFisicoMecanico) {
          const d = new Date(req.body.caducidadVerificacionFisicoMecanico);
          if (!isNaN(d.getTime())) updatedData.caducidadVerificacionFisicoMecanico = d;
        }
        if (req.body.caducidadSeguro) {
          const d = new Date(req.body.caducidadSeguro);
          if (!isNaN(d.getTime())) updatedData.caducidadSeguro = d;
        }
        if (req.body.caducidadPermiso) {
          const d = new Date(req.body.caducidadPermiso);
          if (!isNaN(d.getTime())) updatedData.caducidadPermiso = d;
        }

        // Incorpora las URLs de archivos si se subieron nuevos
        if (fileUrls.tarjetaCirculacion) updatedData.tarjetaCirculacion = fileUrls.tarjetaCirculacion;
        if (fileUrls.verificacionContaminante) updatedData.verificacionContaminante = fileUrls.verificacionContaminante;
        if (fileUrls.verificacionFisicoMecanico) updatedData.verificacionFisicoMecanico = fileUrls.verificacionFisicoMecanico;
        if (fileUrls.seguro) updatedData.seguro = fileUrls.seguro;
        if (fileUrls.permiso) updatedData.permiso = fileUrls.permiso;
        if (fileUrls.foto) updatedData.foto = fileUrls.foto;

        console.log("Datos a actualizar:", updatedData);

        const busUpdated = await Bus.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!busUpdated) {
          return res.status(404).json({ message: 'Bus no encontrado' });
        }

        return res.status(200).json({ message: 'Bus actualizado', bus: busUpdated });
      } catch (error) {
        console.error("Error al actualizar el bus:", error);
        return res.status(500).json({ message: 'Error al actualizar el bus', error });
      }
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ message: 'Error al actualizar el bus', error });
  }
};

// Eliminar un autobús
exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus no encontrado' });
    }
    res.status(200).json({ message: 'Bus eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el bus', error });
  }
};
