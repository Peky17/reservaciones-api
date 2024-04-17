const { Schema, model } = require("mongoose");
// Schema para tareas
const Cine = new Schema({
  nombre: {
    required: true,
    type: String,
    trim: true,
  },
  horario: {
    required: true,
    type: String,
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

module.exports = model("Cine", Cine);
