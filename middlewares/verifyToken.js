const jwt = require("jsonwebtoken");

// Middleware para autenticar el token recibido
const verifyToken = (req, res, next) => {
  // Esperamops en el header de la respuesta el token JWT
  // -- Token name: (x-auth-token) --
  const token = req.header("x-auth-token");
  // Validar si no existe el token
  if (!token) {
    res.status(401).json({
      ok: "false",
      msg: "Token no válido",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.LLAVE);
    req.uid = payload.id;
    next();
  } catch (error) {
    res.status(401).json({
      ok: "false",
      msg: "Token no válido",
    });
  }
};

module.exports = verifyToken;
