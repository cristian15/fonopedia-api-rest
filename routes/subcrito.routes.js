let express = require('express');
let Subcrito = require('../models/subcrito.model');
let mdVerificaToken = require('../middlewares/auth');

let app = express();

//Obtener Todos 
app.get('/', (req, res) => {
    Subcrito.find()
        .exec(function(err, subcritos){
            if(err) res.send(500, err.message);
            res.status(200).jsonp(subcritos);
        });
});
//Retorna un registro por id
app.get('/:id', (req, res) => {
    Subcrito.findById(req.params.id)
        .exec(function(err, subcrito) {
            if(err) return res.status(500).jsonp( err.message);
            res.status(200).jsonp(subcrito);
        });
});

// Nuevo 
app.post('/', (req, res) => {
    let subcrito = new Subcrito({			// datos validos para insertar
        nombre:                         req.body.nombre,
        email:                          req.body.email
    });

    subcrito.save(function(err, subcrito) {	// guarda en Mongo
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(subcrito);
    });
});

// Actualizar 
app.put('/:id', mdVerificaToken.verificaToken, (req, res) => {
    Subcrito.findOneAndUpdate({_id: req.params.id}, req.body, function(err, subcrito) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(subcrito);
    });
});


// Borrar 
app.delete('/:id', mdVerificaToken.verificaToken, (req, res) => {
    Subcrito.findOneAndRemove(req.params.id, function (err, subcrito) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(subcrito);
    });
});

module.exports = app;