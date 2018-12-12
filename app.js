
// Requires
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const bodyParser = require('body-parser');

// Inicializar Variables
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Importar rutas
const apiRoutes = require('./routes/api.routes');


// Conexion DB
mongoose.connect(config.URLMONGO, err => {
    if (err) throw err;
    console.log('Conexion DB: \x1b[32m%s\x1b[0m', 'online');
});

app.use('/api', apiRoutes);
//app.use('/', express.static('cliente'));

// Escuchar Peticiones


const puerto = process.env.PORT || config.PUERTO;

app.listen(config.PUERTO, () => {
    console.log('Express server puerto '+ config.PUERTO + ': \x1b[32m%s\x1b[0m', 'online');
});