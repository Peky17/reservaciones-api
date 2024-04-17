const { Schema, model } = require("mongoose");
// Schema para tareas
const Carrito = new Schema({
  obra: {
    type: Schema.Types.ObjectId,
    ref: "Obra",
  },
  cantidad: {
    type: Number,
    required: true,
  },
  importe: {
    type: Number,
    required: true,
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

module.exports = model("Carrito", Carrito);
