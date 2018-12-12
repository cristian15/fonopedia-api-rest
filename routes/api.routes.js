let express = require('express');

const appRoutes = require('./app.routes');
const usuarioRoutes = require('./usuario.routes');
const loginRoutes = require('./login.routes');
const uploadsRoutes = require('./upload.routes');
const emailRoutes = require('./email.routes');
const patologiasRoutes = require('./patologias.routes');


let app = express();

app.use('/uploads', uploadsRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/email', emailRoutes);
app.use('/patologias', patologiasRoutes);
app.use('/', appRoutes);

module.exports = app;