/* Rutas de autenticación */
const { Router } = require("express");
const {
  createTeatro,
  listarTeatros,
  searchTeatroById,
  updateTeatro,
  deleteTeatro,
} = require("../controllers/teatro/teatroController");
const {
  createSeccion,
  listarSecciones,
  searchSeccionById,
  updateSeccion,
  deleteSeccion,
} = require("../controllers/teatro/seccionController");
const {
  createObra,
  listarObras,
  searchObraById,
  updateObra,
  deleteObra,
} = require("../controllers/teatro/obraController");
const verifyToken = require("../middlewares/verifyToken");

const router = Router();

// Rutas de las tareas CRUD teatro
router.post("/createTeatro", [verifyToken], createTeatro);
router.get("/getAllTeatros", [verifyToken], listarTeatros);
router.put("/updateTeatro/:id", [verifyToken], updateTeatro);
router.delete("/deleteTeatro/:id", [verifyToken], deleteTeatro);
router.get("/searchTeatroById/:id", [verifyToken], searchTeatroById);
// Rutas de las tareas CRUD seccion
router.post("/createSeccion", [verifyToken], createSeccion);
router.get("/getAllSecciones", [verifyToken], listarSecciones);
router.put("/updateSeccion/:id", [verifyToken], updateSeccion);
router.delete("/deleteSeccion/:id", [verifyToken], deleteSeccion);
router.get("/searchSeccionById/:id", [verifyToken], searchSeccionById);
// Rutas de las tareas CRUD obra
router.post("/createObra", [verifyToken], createObra);
router.get("/getAllObras", [verifyToken], listarObras);
router.put("/updateObra/:id", [verifyToken], updateObra);
router.delete("/deleteObra/:id", [verifyToken], deleteObra);
router.get("/searchObraById/:id", [verifyToken], searchObraById);
// Exportar router
module.exports = router;
