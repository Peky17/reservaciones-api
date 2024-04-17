const Seccion = require("../../models/teatro/seccion");

const createSeccion = async (req, res) => {
  const { nombre, precio, obra } = req.body;
  const id = req.uid;
  const nuevaSeccion = new Seccion({ nombre, precio, obra, creator: id });
  try {
    await nuevaSeccion.save();
    res.status(200).json({
      ok: true,
      msg: "Sección creada",
      nuevaSeccion,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "La Sección no pudo ser creada",
    });
  }
};

const listarSecciones = async (req, res) => {
  try {
    const secciones = await Seccion.find();
    return res.status(200).json({
      ok: true,
      secciones,
    });
  } catch (error) {
    return res.status(204).json({
      ok: false,
      msg: "No hay secciones registradas",
    });
  }
};

const searchSeccionById = async (req, res) => {
  const { id } = req.params;
  try {
    const seccion = await Seccion.findById(id);
    return res.status(200).json({
      ok: true,
      msg: "Sección encontrada",
      seccion,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Sección no encontrada",
    });
  }
};

const updateSeccion = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, obra } = req.body;
  try {
    const seccion = await Seccion.findByIdAndUpdate(id, {
      nombre,
      precio,
      obra,
    });
    return res.status(200).json({
      ok: true,
      msg: "Sección actualizada exitosamente",
      seccion,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Sección no actualizada",
    });
  }
};

const deleteSeccion = async (req, res) => {
  const { id } = req.params;
  try {
    const seccion = await Seccion.findByIdAndDelete(id);
    return res.status(200).json({
      ok: true,
      msg: "Sección eliminada exitosamente",
      seccion,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Sección no eliminada",
    });
  }
};

module.exports = {
  createSeccion,
  listarSecciones,
  searchSeccionById,
  updateSeccion,
  deleteSeccion,
};