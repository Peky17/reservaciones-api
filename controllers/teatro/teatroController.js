const Teatro = require("../../models/teatro/teatro");
const Obra = require("../../models/teatro/obra");

const createTeatro = async (req, res) => {
  const { nombre, horario } = req.body;
  const id = req.uid;
  const nuevoTeatro = new Teatro({ nombre, horario, creator: id });
  try {
    await nuevoTeatro.save();
    res.status(200).json({
      ok: true,
      msg: "Teatro creado",
      nuevoTeatro,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "El Teatro no pudo ser creado",
    });
  }
};

const listarTeatros = async (req, res) => {
  try {
    const teatros = await Teatro.find();
    return res.status(200).json({
      ok: true,
      teatros,
    });
  } catch (error) {
    return res.status(204).json({
      ok: false,
      msg: "No hay teatros registrados",
    });
  }
};

const searchTeatroById = async (req, res) => {
  const { id } = req.params;
  try {
    const teatro = await Teatro.findById(id);
    return res.status(200).json({
      ok: true,
      msg: "teatro encontrado",
      teatro,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "teatro no encontrado",
    });
  }
};

const getAllObrasByTeatro = async (req, res) => {
  const { id } = req.params;

  try {
    const obras = await Obra.find({ teatro: id });

    if (!obras || obras.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron obras para el cine proporcionado",
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "obras encontradas",
      obras,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al buscar obras",
    });
  }
};

const updateTeatro = async (req, res) => {
  const { id } = req.params;
  const { nombre, horario } = req.body;
  try {
    const teatro = await Teatro.findByIdAndUpdate(id, {
      nombre,
      horario,
    });
    return res.status(200).json({
      ok: true,
      msg: "teatro actualizado exitosamente",
      teatro,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "teatro no actualizado",
    });
  }
};

const deleteTeatro = async (req, res) => {
  const { id } = req.params;
  try {
    const teatro = await Teatro.findByIdAndDelete(id);
    return res.status(200).json({
      ok: true,
      msg: "teatro eliminado exitosamente",
      teatro,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "teatro no eliminado",
    });
  }
};

module.exports = {
  createTeatro,
  listarTeatros,
  searchTeatroById,
  updateTeatro,
  deleteTeatro,
  getAllObrasByTeatro
};
