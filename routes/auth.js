/* Rutas de autenticación */
const { Router } = require("express");
// Controller login
const { loginUsuario } = require("../controllers/authController");
// Controller registrar
const { registrarUsuario } = require("../controllers/authController");
// Express validator
const { check } = require("express-validator");
const authRouter = Router();

authRouter.post("/login", loginUsuario);
authRouter.post(
  "/registrar",
  [
    check("email", "Formato de email inválido").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("username", "Nombre de usuario requerido").not().isEmpty(),
  ],
  registrarUsuario
);

// Exportamos el modulo
module.exports = authRouter;
