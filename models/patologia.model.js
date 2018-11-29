let mongoose = require('mongoose');

let PatologiaSchema = new mongoose.Schema({

    nombre:                         {type: String},
    fotos:                          [{type: String}],
    descripcion:                    {type: String},
    area:                           {type: String},  
    general:                        {type: String},   
    referencias:                    {type: String},
    videos:                         [{type: String}],
    tags:                           [{type: String}],
    audios:                         [{type: String}]

});

module.exports = mongoose.model('Patologia', PatologiaSchema);