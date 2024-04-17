const { Schema, model } = require("mongoose");
// Schema para tareas
const Museo = new Schema({
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
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Museo", Museo);
