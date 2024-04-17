const Obra = require("../../models/teatro/obra");

const createObra = async (req, res) => {
  const { nombre, horario, seccion, teatro } = req.body;
  const id = req.uid;
  const nuevaObra = new Obra({ nombre, horario, seccion, teatro, creator: id });
  try {
    await nuevaObra.save();
    res.status(200).json({
      ok: true,
      msg: "Obra creada",
      nuevaObra,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "La Obra no pudo ser creada",
    });
  }
};

const listarObras = async (req, res) => {
  try {
    const obras = await Obra.find();
    return res.status(200).json({
      ok: true,
      obras,
    });
  } catch (error) {
    return res.status(204).json({
      ok: false,
      msg: "No hay obras registradas",
    });
  }
};

const searchObraById = async (req, res) => {
  const { id } = req.params;
  try {
    const obra = await Obra.findById(id);
    return res.status(200).json({
      ok: true,
      msg: "Obra encontrada",
      obra,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Obra no encontrada",
    });
  }
};

const updateObra = async (req, res) => {
  const { id } = req.params;
  const { nombre, horario, seccion, teatro } = req.body;
  try {
    const obra = await Obra.findByIdAndUpdate(id, {
      nombre,
      horario,
      seccion,
      teatro,
    });
    return res.status(200).json({
      ok: true,
      msg: "Obra actualizada exitosamente",
      obra,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Obra no actualizada",
    });
  }
};

const deleteObra = async (req, res) => {
  const { id } = req.params;
  try {
    const obra = await Obra.findByIdAndDelete(id);
    return res.status(200).json({
      ok: true,
      msg: "Obra eliminada exitosamente",
      obra,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Obra no eliminada",
    });
  }
};

module.exports = {
  createObra,
  listarObras,
  searchObraById,
  updateObra,
  deleteObra,
};
