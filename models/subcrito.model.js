let mongoose = require('mongoose');

let SubcritoSchema = new mongoose.Schema({

    nombre:                         {type: String},
    email:                          {type: String},
    intereses:                  [{type: String}]

});

module.exports = mongoose.model('Subcrito', SubcritoSchema);