const {Schema, model} = require("mongoose")
// Schema para usuarios
const usuario = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    } 
});

module.exports = model("usuario", usuario);