const { Schema, model } = require("mongoose");
// Schema para tareas
const Funcion = new Schema({
  nombre: {
    required: true,
    unique: true,
    type: String,
    trim: true,
  },
  horario: {
    required: true,
    type: String,
    trim: true,
  },
  precio: {
    required: true,
    type: Number,
    trim: true,
  },
  duracion: {
    required: true,
    type: Number,
    trim: true,
  },
  sala: {
    type: Schema.Types.ObjectId,
    ref: "Sala",
  },
  cine: {
    type: Schema.Types.ObjectId,
    ref: "Cine",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Funcion", Funcion);
