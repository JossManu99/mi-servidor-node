require('dotenv').config(); // Cargar las variables de entorno desde .env

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectToMongoDB = require('./conexion db/database'); // Importar la función correcta


const app = express();

// Conectar a MongoDB
connectToMongoDB(); // Llamar a la función para conectar a MongoDB

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para procesar los cuerpos de las solicitudes en formato JSON
app.use(bodyParser.json());
app.use(express.json());

// Usar morgan para registrar las solicitudes HTTP
app.use(morgan('dev'));

// Middleware para procesar los cuerpos de las solicitudes con URL codificada

app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public' dentro de 'server'
app.use(express.static(path.join(__dirname, 'public')));

// Aquí puedes definir las rutas y demás configuraciones
// Importar y usar las rutas de tus controladores
const autobusRoutes = require('./src/routes/autobusRoutes');
const operadorRoutes = require('./src/routes/operadorRoutes');
const viajeRoutes = require('./src/routes/viajeRoutes');
const authRouter =require ('./src/routes/authRoutes');
const turnoRoutes = require('./src/routes/turnoRoutes');
const empresarolRoutes = require('./src/routes/empresaroles');
const horariorutas = require('./src/routes/horariorutas');
const tablarolRoutes = require('./src/routes/tablarolRoutes');
const tablaRolTbfRoute = require('./src//routes/TablaRolTBFRoutes');
const manttoRoutes = require('./src//routes/manttoRoutes');
const refaccionRoutes = require('./src//routes/refaccionRoutes');
const CombustibleRoutes = require('./src//routes/CombustibleRoutes');
const propietarioRoutes = require('./src/routes/propietarioRoutes');

const recargaRoutes = require('./src/routes/recargaRoutes');

const extrasRoutes = require('./src/routes/extrasRoutes');






// Usar rutas definidas
app.use('/api', autobusRoutes);
app.use('/api', operadorRoutes);
app.use('/api', viajeRoutes);
app.use('/api', authRouter);
app.use('/api', turnoRoutes);
app.use('/api', empresarolRoutes);
app.use('/api', horariorutas);
app.use('/api', tablarolRoutes);
app.use('/api', tablaRolTbfRoute);
app.use ('/api',manttoRoutes);
app.use ('/api',refaccionRoutes);
app.use ('/api',CombustibleRoutes);
app.use('/api', propietarioRoutes);
app.use('/api', recargaRoutes);
app.use('/api', extrasRoutes);







module.exports = app;
