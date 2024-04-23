/* Rutas de autenticación */
const { Router } = require("express");
const {
  createReservacion,
  getAllReservacionesByCliente,
} = require("../controllers/reservaciones");
const verifyToken = require("../middlewares/verifyToken");
const router = Router();

// Rutas de las tareas CRUD cine
router.post("/createReservacion", [verifyToken], createReservacion);
router.get(
  "/getAllReservacionesByUser/:id",
  [verifyToken],
  getAllReservacionesByCliente
);
// Exportar router
module.exports = router;
