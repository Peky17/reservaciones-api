const Museo = require("../../models/museo/museo");

const createMuseo = async (req, res) => {
  const { nombre, horario, precio } = req.body;
  const id = req.uid;
  const nuevoMuseo = new Museo({ nombre, horario, precio, creator: id });
  try {
    await nuevoMuseo.save();
    res.status(200).json({
      ok: true,
      msg: "Museo creado",
      nuevoMuseo,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "El museo no pudo ser creado",
    });
  }
};

const listarMuseos = async (req, res) => {
  try {
    const museos = await Museo.find();
    return res.status(200).json({
      ok: true,
      museos,
    });
  } catch (error) {
    return res.status(204).json({
      ok: false,
      msg: "No hay museos registrados",
    });
  }
};

const searchMuseoById = async (req, res) => {
  const { id } = req.params;
  try {
    const museo = await Museo.findById(id);
    return res.status(200).json({
      ok: true,
      msg: "Museo encontrado",
      museo,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Museo no encontrado",
    });
  }
};

const updateMuseo = async (req, res) => {
  const { id } = req.params;
  const { nombre, horario, precio } = req.body;
  try {
    const museo = await Museo.findByIdAndUpdate(id, {
      nombre,
      horario,
      precio,
    });
    return res.status(200).json({
      ok: true,
      msg: "Museo actualizado exitosamente",
      museo,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Museo no actualizado",
    });
  }
};

const deleteMuseo = async (req, res) => {
  const { id } = req.params;
  try {
    const museo = await Museo.findByIdAndDelete(id);
    return res.status(200).json({
      ok: true,
      msg: "Museo eliminado exitosamente",
      museo,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Museo no eliminado",
    });
  }
};

module.exports = {
  createMuseo,
  listarMuseos,
  searchMuseoById,
  updateMuseo,
  deleteMuseo,
};
