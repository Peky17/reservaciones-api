const Cine = require("../../models/cine/cine");
const Funcion = require("../../models/cine/funcion");

const createCine = async (req, res) => {
  const { nombre, horario } = req.body;
  const creator = req.uid; // Asignar el ID del usuario creador

  const nuevoCine = new Cine({ nombre, horario, creator });

  try {
    const cineCreado = await nuevoCine.save();
    res.status(200).json({
      ok: true,
      msg: "Cine creado",
      cine: cineCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear el cine",
    });
  }
};

const listarCines = async (req, res) => {
  try {
    const cines = await Cine.find();
    return res.status(200).json({
      ok: true,
      cines,
    });
  } catch (error) {
    return res.status(204).json({
      ok: false,
      msg: "No hay cines registrados",
    });
  }
};

const searchCinesById = async (req, res) => {
  const { id } = req.params;
  try {
    const cine = await Cine.findById(id);
    return res.status(200).json({
      ok: true,
      msg: "Cine encontrado",
      cine,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Cine no encontrado",
    });
  }
};

const getAllFuncionesByCine = async (req, res) => {
  const { id } = req.params;

  try {
    const funciones = await Funcion.find({ cine: id });

    if (!funciones || funciones.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron funciones para el cine proporcionado",
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "Funciones encontradas",
      funciones,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al buscar funciones",
    });
  }
};

const updateCine = async (req, res) => {
  const { id } = req.params;
  const { nombre, horario } = req.body;
  try {
    const cine = await Cine.findByIdAndUpdate(id, {
      nombre,
      horario,
    });
    return res.status(200).json({
      ok: true,
      msg: "Cine actualizado exitosamente",
      cine,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Cine no actualizado",
    });
  }
};

const deleteCine = async (req, res) => {
  const { id } = req.params;
  try {
    const cine = await Cine.findByIdAndDelete(id);
    return res.status(200).json({
      ok: true,
      msg: "Cine eliminado exitosamente",
      cine,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Cine no eliminado",
    });
  }
};

module.exports = {
  createCine,
  listarCines,
  searchCinesById,
  getAllFuncionesByCine,
  updateCine,
  deleteCine,
};
