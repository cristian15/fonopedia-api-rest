
let express = require('express');
let bcrypt = require('bcryptjs');

let app = express();

let Usuario = require('../models/usuario.model');
let mdVerificaToken = require('../middlewares/auth');


//Obtener Todos Usuarios
app.get('/', mdVerificaToken.verificaToken, (req, res) => {
    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msj: 'Error al consultar usuarios',
                        errors: err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            }
        );
});


// Nuevo Usuario
app.post('/', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });
    usuario.save((err, newUsuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msj: 'Error al crear usuario',
                errors: err
            });
        }
        newUsuario.password = null;
        return res.status(201).json({
            ok: true,
            usuario: newUsuario,
            usuariotoken: req.usuario
        });
    });
});

// Actualizar Usuario

app.put('/:id', mdVerificaToken.verificaToken, (req, res) => {
    let body = req.body;
    let id = req.params.id;
    console.log(body);
    Usuario.findById(id, (err, usuario) => {
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

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;
        usuario.img = body.img;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }
            usuarioGuardado.password = null;
            return res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});


// Borrar usuario
app.delete('/:id', mdVerificaToken.verificaToken, (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar usuario',
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario no existe',
            });
        }
        return res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});


module.exports = app;