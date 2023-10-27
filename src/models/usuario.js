const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
});

// Definir el modelo a partir del esquema
const Usuario = mongoose.model('Usuario', usuarioSchema, 'persona');

module.exports = Usuario;
