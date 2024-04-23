const Reservacion = require("../models/reservaciones");
const Usuario = require("../models/usuarios");

const createReservacion = async (req, res) => {
  const { concepto, cantidad, unitario, total } = req.body;
  const creator = req.uid; // Asignar el ID del usuario creador

  const nuevaReservacion = new Reservacion({
    concepto,
    cantidad,
    unitario,
    total,
    creator,
  });

  try {
    const reservacionCreada = await nuevaReservacion.save();
    res.status(200).json({
      ok: true,
      msg: "Reservacion creada",
      reservacion: reservacionCreada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear reservacion",
    });
  }
};

const getAllReservacionesByCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const reservaciones = await Reservacion.find({ creator: id });

    if (!reservaciones || reservaciones.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron reservaciones para el cliente proporcionado",
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "reservaciones encontradas",
      reservaciones,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al buscar reservaciones",
    });
  }
};

module.exports = {
  createReservacion,
  getAllReservacionesByCliente,
};
