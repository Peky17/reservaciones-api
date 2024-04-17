/* Rutas de autenticación */
const { Router } = require("express");
const {
  createMuseo,
  listarMuseos,
  searchMuseoById,
  updateMuseo,
  deleteMuseo,
} = require("../controllers/museo/museoController");
const verifyToken = require("../middlewares/verifyToken");

const router = Router();

// Rutas de las tareas CRUD
router.post("/createMuseo", [verifyToken], createMuseo);
router.get("/getAllMuseos", [verifyToken], listarMuseos);
router.put("/updateMuseo/:id", [verifyToken], updateMuseo);
router.delete("/deleteMuseo/:id", [verifyToken], deleteMuseo);
router.get("/searchMuseo/:id", [verifyToken], searchMuseoById);
// Exportar router
module.exports = router;
