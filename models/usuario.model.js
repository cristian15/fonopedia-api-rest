const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

const usuarioSchema = new Schema({
    nombre: {type: String, required: [true, "El nombre del usuario es obligatorio"]},
    email: {type: String, required: [true, "El email es obligatorio"], unique: true},
    password: {type: String, required: [true, "La contraseña es obligatoria"]},
    img: {type: String, default:''},
    role: {type: String, required: true, default: 'USER_ROLE', enum: roles}
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} tiene que ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);