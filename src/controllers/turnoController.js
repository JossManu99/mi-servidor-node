const Empresa = require('../models/Clientes');

// Crear una nueva empresa
exports.createEmpresa = async (req, res) => {
    try {
        // Mostrar los datos que estamos recibiendo en la solicitud
        console.log('Datos recibidos para crear la empresa:', req.body);

        const nuevaEmpresa = new Empresa(req.body);
        
        // Verificar que el objeto `nuevaEmpresa` está bien antes de guardarlo
        console.log('Empresa antes de guardar:', nuevaEmpresa);

        await nuevaEmpresa.save();

        // Mostrar los datos guardados
        console.log('Empresa guardada con éxito:', nuevaEmpresa);
        
        res.status(201).json({ message: 'Empresa creada con éxito', empresa: nuevaEmpresa });
    } catch (error) {
        console.error('Error al crear la empresa:', error.message); // Detallar el error en consola
        res.status(500).json({ message: 'Error al crear la empresa', error: error.message });
    }
};

// Obtener todas las empresas
exports.getEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find();
        console.log('Empresas encontradas:', empresas); // Mostrar las empresas obtenidas
        res.status(200).json(empresas);
    } catch (error) {
        console.error('Error al obtener las empresas:', error.message); // Detallar el error en consola
        res.status(500).json({ message: 'Error al obtener las empresas', error: error.message });
    }
};

// Obtener una empresa por su ID
exports.getEmpresaById = async (req, res) => {
    const { id } = req.params;
    console.log('ID de la empresa solicitada:', id); // Mostrar el ID solicitado

    try {
        const empresaEncontrada = await Empresa.findById(id);
        if (!empresaEncontrada) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }

        // Mostrar los datos de la empresa encontrada
        console.log('Empresa encontrada:', empresaEncontrada);

        res.status(200).json(empresaEncontrada);
    } catch (error) {
        console.error('Error al obtener la empresa por ID:', error.message); // Detallar el error en consola
        res.status(500).json({ message: 'Error al obtener la empresa', error: error.message });
    }
};

// Actualizar una empresa por su ID
exports.updateEmpresa = async (req, res) => {
    const { id } = req.params;
    console.log('ID de la empresa a actualizar:', id); // Mostrar el ID solicitado

    try {
        const empresaActualizada = await Empresa.findByIdAndUpdate(id, req.body, { new: true });

        if (!empresaActualizada) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }

        // Mostrar los datos de la empresa actualizada
        console.log('Empresa actualizada:', empresaActualizada);

        res.status(200).json({ message: 'Empresa actualizada con éxito', empresa: empresaActualizada });
    } catch (error) {
        console.error('Error al actualizar la empresa:', error.message); // Detallar el error en consola
        res.status(500).json({ message: 'Error al actualizar la empresa', error: error.message });
    }
};

// Eliminar una empresa por su ID
exports.deleteEmpresa = async (req, res) => {
    const { id } = req.params;
    console.log('ID de la empresa a eliminar:', id); // Mostrar el ID solicitado

    try {
        const empresaEliminada = await Empresa.findByIdAndDelete(id);
        if (!empresaEliminada) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }

        // Confirmar que la empresa ha sido eliminada
        console.log('Empresa eliminada con éxito:', empresaEliminada);

        res.status(200).json({ message: 'Empresa eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la empresa:', error.message); // Detallar el error en consola
        res.status(500).json({ message: 'Error al eliminar la empresa', error: error.message });
    }
};
