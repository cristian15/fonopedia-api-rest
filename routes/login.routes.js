let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let config = require('../config/config');

let app = express();

let Usuario = require('../models/usuario.model');

app.post('/', (req, res) => {

    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario no existe',
            });
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Contraseña incorrecta',
            });
        }
        usuario.password = null;
        // Crear Token
        let token = jwt.sign({usuario: usuario}, config.SEEDJWT, {expiresIn: 14400});

        return res.status(200).json({
            ok: true,
            usuario: usuario,
            token: token,
            id: usuario.id
        });



    });
});

app.get('/', (req, res) => {
    let token = req.query.token;
    jwt.verify(token, config.SEEDJWT, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                msj: 'Token no valido',
                errors: err
            });
        }
        return res.status(200).json({
            ok: true
        });
    })
});



module.exports = app;