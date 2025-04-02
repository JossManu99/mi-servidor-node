// controllers/refaccionControlador.js
const Refaccion = require('../models/Refaction');

// Obtener todas las refacciones
exports.obtenerTodasLasRefacciones = async (req, res) => {
  try {
    console.log('GET /refacciones - Obteniendo todas las refacciones');
    const refacciones = await Refaccion.find().sort({ createdAt: -1 });
    console.log(`Refacciones encontradas: ${refacciones.length}`);
    res.status(200).json({
      exito: true,
      cantidad: refacciones.length,
      datos: refacciones
    });
  } catch (error) {
    console.error('Error al obtener refacciones:', error);
    res.status(500).json({
      exito: false,
      error: 'Error al obtener las refacciones'
    });
  }
};

// Obtener una refacción por ID
exports.obtenerRefaccionPorId = async (req, res) => {
  try {
    console.log(`GET /refacciones/${req.params.id} - Buscando refacción`);
    const refaccion = await Refaccion.findById(req.params.id);
    
    if (!refaccion) {
      console.log(`Refacción con ID ${req.params.id} no encontrada`);
      return res.status(404).json({
        exito: false,
        error: 'Refacción no encontrada'
      });
    }
    
    console.log('Refacción encontrada:', refaccion);
    res.status(200).json({
      exito: true,
      datos: refaccion
    });
  } catch (error) {
    console.error(`Error al obtener refacción ${req.params.id}:`, error);
    res.status(500).json({
      exito: false,
      error: 'Error al obtener la refacción'
    });
  }
};

// Crear nueva refacción
exports.crearRefaccion = async (req, res) => {
  try {
    console.log('POST /refacciones - Creando nueva refacción');
    console.log('Datos recibidos:', req.body);
    
    const { cantidad, nombreRefaccion, nombreProveedor, costoTotal, codigo } = req.body;
    
    // Verificar campos obligatorios
    const camposFaltantes = [];
    if (!cantidad) camposFaltantes.push('cantidad');
    if (!nombreRefaccion) camposFaltantes.push('nombreRefaccion');
    if (!nombreProveedor) camposFaltantes.push('nombreProveedor');
    if (!costoTotal) camposFaltantes.push('costoTotal');
    if (!codigo) camposFaltantes.push('codigo');
    
    if (camposFaltantes.length > 0) {
      console.log('Campos faltantes:', camposFaltantes);
      return res.status(400).json({
        exito: false,
        error: 'Todos los campos son obligatorios',
        camposFaltantes
      });
    }

    // Convertir a número para calcular costoIndividual
    const cantidadNum = parseFloat(cantidad) || 0;
    const costoTotalNum = parseFloat(costoTotal) || 0;
    const costoIndividual = cantidadNum > 0 ? costoTotalNum / cantidadNum : 0;

    // Crear la refacción con costoIndividual calculado
    const refaccion = await Refaccion.create({
      cantidad,
      nombreRefaccion,
      nombreProveedor,
      costoTotal,
      codigo,
      costoIndividual
    });

    console.log('Refacción creada exitosamente:', refaccion);
    
    res.status(201).json({
      exito: true,
      datos: refaccion
    });
  } catch (error) {
    console.error('Error al crear refacción:', error);
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map(val => val.message);
      console.log('Errores de validación:', mensajes);
      return res.status(400).json({
        exito: false,
        error: mensajes
      });
    } else {
      res.status(500).json({
        exito: false,
        error: 'Error al crear la refacción'
      });
    }
  }
};

// Actualizar refacción
exports.actualizarRefaccion = async (req, res) => {
  try {
    console.log(`PUT /refacciones/${req.params.id} - Actualizando refacción`);
    console.log('Datos recibidos para actualización:', req.body);
    
    let refaccion = await Refaccion.findById(req.params.id);
    
    if (!refaccion) {
      console.log(`Refacción con ID ${req.params.id} no encontrada`);
      return res.status(404).json({
        exito: false,
        error: 'Refacción no encontrada'
      });
    }
    
    console.log('Datos actuales de la refacción:', refaccion);

    // Si vienen nuevos valores de cantidad o costoTotal, recalcular
    const cantidadNum = parseFloat(req.body.cantidad || refaccion.cantidad) || 0;
    const costoTotalNum = parseFloat(req.body.costoTotal || refaccion.costoTotal) || 0;
    req.body.costoIndividual = cantidadNum > 0 ? costoTotalNum / cantidadNum : 0;

    refaccion = await Refaccion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,         // Devuelve el documento actualizado
      runValidators: true // Ejecuta los validadores nuevamente
    });
    
    console.log('Refacción actualizada:', refaccion);
    
    res.status(200).json({
      exito: true,
      datos: refaccion
    });
  } catch (error) {
    console.error(`Error al actualizar refacción ${req.params.id}:`, error);
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map(val => val.message);
      console.log('Errores de validación:', mensajes);
      return res.status(400).json({
        exito: false,
        error: mensajes
      });
    } else {
      res.status(500).json({
        exito: false,
        error: 'Error al actualizar la refacción'
      });
    }
  }
};

// Eliminar refacción
exports.eliminarRefaccion = async (req, res) => {
  try {
    console.log(`DELETE /refacciones/${req.params.id} - Eliminando refacción`);
    
    const refaccion = await Refaccion.findById(req.params.id);
    
    if (!refaccion) {
      console.log(`Refacción con ID ${req.params.id} no encontrada`);
      return res.status(404).json({
        exito: false,
        error: 'Refacción no encontrada'
      });
    }
    
    console.log('Refacción a eliminar:', refaccion);
    
    await refaccion.deleteOne();
    
    console.log('Refacción eliminada correctamente');
    
    res.status(200).json({
      exito: true,
      datos: {},
      mensaje: 'Refacción eliminada correctamente'
    });
  } catch (error) {
    console.error(`Error al eliminar refacción ${req.params.id}:`, error);
    res.status(500).json({
      exito: false,
      error: 'Error al eliminar la refacción'
    });
  }
};
