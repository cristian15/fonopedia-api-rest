let express = require('express');
let Patologia = require('../models/patologia.model');
let mdVerificaToken = require('../middlewares/auth');

let app = express();

//Obtener Todos 
app.get('/', (req, res) => {
    Patologia.find()
    .sort({fecha_publicacion:-1})
        .exec(function(err, patologias){
            if(err) res.send(500, err.message);
            res.status(200).jsonp(patologias);
        });
});
//Retorna un registro por id
app.get('/:id', (req, res) => {
    Patologia.findById(req.params.id)
        .exec(function(err, patologia) {
            if(err) return res.status(500).jsonp( err.message);
            res.status(200).jsonp(patologia);
        });
});

// Nuevo 
app.post('/', mdVerificaToken.verificaToken, (req, res) => {
    let patologia = new Patologia({			// datos validos para insertar
        nombre:                         req.body.nombre,
        fotos:                          req.body.fotos,
        descripcion:                    req.body.descripcion,
        area:                           req.body.area,
        general:                        req.body.general,
        referencias:                    req.body.referencias,
        videos:                         req.body.videos,
        tags:                           req.body.tags,
        audios:                         req.body.audios,
        visitas:                        req.body.visitas,
        fecha_publicacion:              req.body.fecha_publicacion
    });

    patologia.save(function(err, patologia) {	// guarda en Mongo
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(patologia);
    });
});

// Actualizar 
app.put('/:id', (req, res) => {
    Patologia.findOneAndUpdate({_id: req.params.id}, req.body, function(err, patologia) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(patologia);
    });
});


// Borrar 
app.delete('/:id', mdVerificaToken.verificaToken, (req, res) => {
    Patologia.findOneAndRemove({'_id' : req.params.id}, function (err, patologia) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(patologia);
    });
});

module.exports = app;