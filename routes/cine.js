/* Rutas de autenticación */
const { Router } = require("express");
const {
  createCine,
  listarCines,
  searchCinesById,
  updateCine,
  deleteCine,
} = require("../controllers/cine/cineController");
const {
  createSala,
  listarSalas,
  searchSalaById,
  updateSala,
  deleteSala,
} = require("../controllers/cine/salaController");
const {
  createFuncion,
  listarFunciones,
  searchFuncionById,
  updateFuncion,
  deleteFuncion,
} = require("../controllers/cine/funcionController");
const verifyToken = require("../middlewares/verifyToken");

const router = Router();

// Rutas de las tareas CRUD cine
router.post("/createCine", [verifyToken], createCine);
router.get("/getAllCines", [verifyToken], listarCines);
router.put("/updateCine/:id", [verifyToken], updateCine);
router.delete("/deleteCine/:id", [verifyToken], deleteCine);
router.get("/searchCinesById/:id", [verifyToken], searchCinesById);
// Rutas de las tareas CRUD sala
router.post("/createSala", [verifyToken], createSala);
router.get("/getAllSalas", [verifyToken], listarSalas);
router.put("/updateSala/:id", [verifyToken], updateSala);
router.delete("/deleteSala/:id", [verifyToken], deleteSala);
router.get("/searchSalaById/:id", [verifyToken], searchSalaById);
// Rutas de las tareas CRUD funcion
router.post("/createFuncion", [verifyToken], createFuncion);
router.get("/getAllFunciones", [verifyToken], listarFunciones);
router.put("/updateFuncion/:id", [verifyToken], updateFuncion);
router.delete("/deleteFuncion/:id", [verifyToken], deleteFuncion);
router.get("/searchFuncionById/:id", [verifyToken], searchFuncionById);
// Exportar router
module.exports = router;
