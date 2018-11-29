const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.verificaToken = function(req, res, next) {
    const token = req.query.token;

    jwt.verify(token, config.SEEDJWT, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                msj: 'Token no valido',
                errors: err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};