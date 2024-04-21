const Funcion = require("../../models/cine/funcion");

const createFuncion = async (req, res) => {
  const { nombre, horario, precio, duracion, cine } = req.body;
  const id = req.uid;
  const nuevaFuncion = new Funcion({ nombre, horario, precio, duracion, cine, creator: id });
  try {
    await nuevaFuncion.save();
    res.status(200).json({
      ok: true,
      msg: "Función creada",
      nuevaFuncion,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "La Función no pudo ser creada",
    });
  }
};

const listarFunciones = async (req, res) => {
  try {
    const funciones = await Funcion.find();
    return res.status(200).json({
      ok: true,
      funciones,
    });
  } catch (error) {
    return res.status(204).json({
      ok: false,
      msg: "No hay funciones registradas",
    });
  }
};

const searchFuncionById = async (req, res) => {
  const { id } = req.params;
  try {
    const funcion = await Funcion.findById(id);
    return res.status(200).json({
      ok: true,
      msg: "Función encontrada",
      funcion,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Función no encontrada",
    });
  }
};

const updateFuncion = async (req, res) => {
  const { id } = req.params;
  const { nombre, horario, precio, duracion, sala } = req.body;
  try {
    const funcion = await Funcion.findByIdAndUpdate(id, {
      nombre,
      horario,
      precio,
      duracion,
      sala,
    });
    return res.status(200).json({
      ok: true,
      msg: "Función actualizada exitosamente",
      funcion,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Función no actualizada",
    });
  }
};

const deleteFuncion = async (req, res) => {
  const { id } = req.params;
  try {
    const funcion = await Funcion.findByIdAndDelete(id);
    return res.status(200).json({
      ok: true,
      msg: "Función eliminada exitosamente",
      funcion,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Función no eliminada",
    });
  }
};

module.exports = {
  createFuncion,
  listarFunciones,
  searchFuncionById,
  updateFuncion,
  deleteFuncion,
};
