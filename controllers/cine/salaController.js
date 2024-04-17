const Sala = require("../../models/cine/sala");

const createSala = async (req, res) => {
  const { nombre, asientos, cine } = req.body;
  const id = req.uid;
  const nuevaSala = new Sala({ nombre, asientos, cine, creator: id });
  try {
    await nuevaSala.save();
    res.status(200).json({
      ok: true,
      msg: "Sala creada",
      nuevaSala,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "La Sala no pudo ser creada",
    });
  }
};

const listarSalas = async (req, res) => {
  try {
    const salas = await Sala.find();
    return res.status(200).json({
      ok: true,
      salas,
    });
  } catch (error) {
    return res.status(204).json({
      ok: false,
      msg: "No hay salas registradas",
    });
  }
};

const searchSalaById = async (req, res) => {
  const { id } = req.params;
  try {
    const sala = await Sala.findById(id);
    return res.status(200).json({
      ok: true,
      msg: "Sala encontrada",
      sala,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Sala no encontrada",
    });
  }
};

const updateSala = async (req, res) => {
  const { id } = req.params;
  const { nombre, asientos, cine } = req.body;
  try {
    const sala = await Sala.findByIdAndUpdate(id, {
      nombre,
      asientos,
      cine,
    });
    return res.status(200).json({
      ok: true,
      msg: "Sala actualizada exitosamente",
      sala,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Sala no actualizada",
    });
  }
};

const deleteSala = async (req, res) => {
  const { id } = req.params;
  try {
    const sala = await Sala.findByIdAndDelete(id);
    return res.status(200).json({
      ok: true,
      msg: "Sala eliminada exitosamente",
      sala,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Sala no eliminada",
    });
  }
};

module.exports = {
  createSala,
  listarSalas,
  searchSalaById,
  updateSala,
  deleteSala,
};
