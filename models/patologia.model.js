let mongoose = require('mongoose');

let VideosSchema = new mongoose.Schema({
    titulo:         {type:String},
    video:          {type:String},
    descripcion:    {type:String}
});
let PatologiaSchema = new mongoose.Schema({

    nombre:                         {type: String},
    fotos:                          [{type: String}],
    descripcion:                    {type: String},
    area:                           {type: String},  
    general:                        {type: String},   
    referencias:                    {type: String},
    videos:                         [VideosSchema],
    tags:                           [{type: String}],
    audios:                         [{type: String}],
    visitas:                        [{type: Date}],
    fecha_publicacion:              {type: Date}

});

module.exports = mongoose.model('Patologia', PatologiaSchema);