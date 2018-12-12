let express = require('express');
let Patologia = require('../../models/Patologia');
let mdVerificaToken = require('../../middlewares/auth');

let app = express();

//Obtener Todos Arriendos
app.get('/', (req, res) => {
    Patologia.find()
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

// Nuevo Arriendo
app.post('/', mdVerificaToken.verificaToken, (req, res) => {
    let patologia = new Arriendo({			// datos validos para insertar
        nombre:                         req.body.nombre,
        fotos:                          req.body.fotos,
        descripcion:                    req.body.descripcion,
        area:                           req.body.area,
        general:                        req.body.general,
        referencias:                    req.body.referencias,
        videos:                         req.body.videos,
        tags:                           req.body.tags,
        audios:                         req.body.audios
    });

    arriendo.save(function(err, patologia) {	// guarda en Mongo
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(patologia);
    });
});

// Actualizar Arriendo

app.put('/:id', mdVerificaToken.verificaToken, (req, res) => {
    Patologia.findOneAndUpdate({_id: req.params.id}, req.body, function(err, patologia) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(patologia);
    });
});


// Borrar arriendo
app.delete('/:id', mdVerificaToken.verificaToken, (req, res) => {
    Arriendo.findOneAndRemove(req.params.id, function (err, arriendo) {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(arriendo);
    });
});

module.exports = app;