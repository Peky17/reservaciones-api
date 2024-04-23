const { Schema, model } = require("mongoose");
// Schema para tareas
const Reservaciones = new Schema({
  concepto: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  unitario: {
    type: Number,
    required: true,
  },
  total: {
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

module.exports = model("Reservaciones", Reservaciones);
