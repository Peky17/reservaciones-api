const { Schema, model } = require("mongoose");
// Schema para tareas
const Seccion = new Schema({
  nombre: {
    required: true,
    unique: true,
    type: String,
    trim: true,
  },
  precio: {
    required: true,
    type: Number,
    trim: true,
  },
  // obra: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Obra",
  // },
  creator: {
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Seccion", Seccion);
