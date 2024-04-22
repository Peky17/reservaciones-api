const { Schema, model } = require("mongoose");
// Schema para tareas
const Obra = new Schema({
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
  teatro: {
    type: Schema.Types.ObjectId,
    ref: "Teatro",
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

module.exports = model("Obra", Obra);
