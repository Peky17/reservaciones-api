const { Schema, model } = require("mongoose");
// Schema para tareas
const Sala = new Schema({
  nombre: {
    required: true,
    unique: true,
    type: String,
    trim: true,
  },
  asientos: {
    required: true,
    type: Number,
    trim: true,
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

module.exports = model("Sala", Sala);
