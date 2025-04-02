const Operador = require('../models/Operador');
const multer = require('multer');
const cloudinary = require('../../conexion db/cloudinary');

// Configuración de multer para manejar la carga del archivo temporal
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

// Crear un operador
exports.createOperador = async (req, res) => {
  try {
    upload.fields([
      { name: 'documentoLicenciaEstatal', maxCount: 1 },
      { name: 'documentoLicenciaFederal', maxCount: 1 },
      { name: 'documentoExamenMedico', maxCount: 1 },
      { name: 'documentoTarjeton', maxCount: 1 },
      { name: 'foto', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error al subir los archivos', error: err });
      }

      try {
        const fileUrls = {};
        if (req.files.documentoLicenciaEstatal) {
          fileUrls.documentoLicenciaEstatal = await uploadToCloudinary(req.files.documentoLicenciaEstatal[0].buffer);
        }
        if (req.files.documentoLicenciaFederal) {
          fileUrls.documentoLicenciaFederal = await uploadToCloudinary(req.files.documentoLicenciaFederal[0].buffer);
        }
        if (req.files.documentoExamenMedico) {
          fileUrls.documentoExamenMedico = await uploadToCloudinary(req.files.documentoExamenMedico[0].buffer);
        }
        if (req.files.documentoTarjeton) {
          fileUrls.documentoTarjeton = await uploadToCloudinary(req.files.documentoTarjeton[0].buffer);
        }
        if (req.files.foto) {
          fileUrls.foto = await uploadToCloudinary(req.files.foto[0].buffer);
        }

        const operador = new Operador({
          numeroOperador: req.body.numeroOperador,
          nombre: req.body.nombre,
          fechaNacimiento: req.body.fechaNacimiento,
          fechaIngreso: req.body.fechaIngreso,
          edad: req.body.edad,
          tipoLicencia: req.body.tipoLicencia,
          documentoLicenciaEstatal: fileUrls.documentoLicenciaEstatal || null,
          fechaVencimientoLicenciaEstatal: req.body.fechaVencimientoLicenciaEstatal,
          documentoLicenciaFederal: fileUrls.documentoLicenciaFederal || null,
          fechaVencimientoLicenciaFederal: req.body.fechaVencimientoLicenciaFederal,
          puesto: req.body.puesto,
          fechaVencimientoExamenMedico: req.body.fechaVencimientoExamenMedico,
          documentoExamenMedico: fileUrls.documentoExamenMedico || null,
          observaciones: req.body.observaciones,
          documentoTarjeton: fileUrls.documentoTarjeton || null,
          fechaVencimientoTarjeton: req.body.fechaVencimientoTarjeton,
          foto: fileUrls.foto || null
        });

        await operador.save();
        res.status(201).json({ message: 'Operador creado', operador });
      } catch (error) {
        console.error("Error al subir los archivos a Cloudinary:", error);
        return res.status(500).json({ message: 'Error al subir los archivos a Cloudinary', error });
      }
    });
  } catch (error) {
    console.error("Error al crear el operador:", error);
    res.status(500).json({ message: 'Error al crear el operador', error });
  }
};

// Obtener todos los operadores
exports.getOperadores = async (req, res) => {
  try {
    const operadores = await Operador.find();
    res.status(200).json(operadores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los operadores', error });
  }
};

// Obtener un operador por ID
exports.getOperadorById = async (req, res) => {
  try {
    const operador = await Operador.findById(req.params.id);
    if (!operador) {
      return res.status(404).json({ message: 'Operador no encontrado' });
    }
    res.status(200).json(operador);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el operador', error });
  }
};

// Actualizar un operador
exports.updateOperador = async (req, res) => {
  try {
    upload.fields([
      { name: 'documentoLicenciaEstatal', maxCount: 1 },
      { name: 'documentoLicenciaFederal', maxCount: 1 },
      { name: 'documentoExamenMedico', maxCount: 1 },
      { name: 'documentoTarjeton', maxCount: 1 },
      { name: 'foto', maxCount: 1 }
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error al subir los archivos', error: err });
      }

      try {
        const fileUrls = {};
        if (req.files.documentoLicenciaEstatal) {
          fileUrls.documentoLicenciaEstatal = await uploadToCloudinary(req.files.documentoLicenciaEstatal[0].buffer);
        }
        if (req.files.documentoLicenciaFederal) {
          fileUrls.documentoLicenciaFederal = await uploadToCloudinary(req.files.documentoLicenciaFederal[0].buffer);
        }
        if (req.files.documentoExamenMedico) {
          fileUrls.documentoExamenMedico = await uploadToCloudinary(req.files.documentoExamenMedico[0].buffer);
        }
        if (req.files.documentoTarjeton) {
          fileUrls.documentoTarjeton = await uploadToCloudinary(req.files.documentoTarjeton[0].buffer);
        }
        if (req.files.foto) {
          fileUrls.foto = await uploadToCloudinary(req.files.foto[0].buffer);
        }

        const updatedData = { ...req.body, ...fileUrls };
        const operadorUpdated = await Operador.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!operadorUpdated) {
          return res.status(404).json({ message: 'Operador no encontrado' });
        }

        res.status(200).json({ message: 'Operador actualizado', operador: operadorUpdated });
      } catch (error) {
        console.error("Error al subir los archivos a Cloudinary:", error);
        return res.status(500).json({ message: 'Error al subir los archivos a Cloudinary', error });
      }
    });
  } catch (error) {
    console.error("Error al actualizar el operador:", error);
    res.status(500).json({ message: 'Error al actualizar el operador', error });
  }
};

// Eliminar un operador
exports.deleteOperador = async (req, res) => {
  try {
    const operador = await Operador.findByIdAndDelete(req.params.id);
    if (!operador) {
      return res.status(404).json({ message: 'Operador no encontrado' });
    }
    res.status(200).json({ message: 'Operador eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el operador', error });
  }
};