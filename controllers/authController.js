const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuarios");

/*** Método para registrar un usuario ***/
const registrarUsuario = async (req, res) => {
  // Desestructurar información entrante
  const { email, password, username } = req.body;
  try {
    let usuario = await usuarioModel.findOne({ email });
    // realizar validacion si el usuario ya existe
    if (usuario) {
      return res.status(501).json({
        ok: false,
        msg: "El email ya existe",
      });
    }
    // Fijar datos a enviar al modelo
    const nuevoUsuario = new usuarioModel({ email, password, username });
    // Encriptar contraseña del usuario
    const salt = bcryptjs.genSaltSync(12);
    nuevoUsuario.password = bcryptjs.hashSync(password, salt);

    // Registramos el usuario
    await nuevoUsuario.save();

    // Generar payload
    const payload = {
      id: nuevoUsuario.id,
    };

    // Firmar token
    jwt.sign(
      payload,
      process.env.LLAVE,
      { expiresIn: 3600 },
      (error, token) => {
        res.json({
          ok: true,
          id: nuevoUsuario.id,
          username,
          msg: "Usuario registrado",
          token: token,
        });
        // Imprimir registro de usuario
        console.log("Usuario registrado correctamente");
      }
    );
  } catch (error) {
    res.json({
      ok: false,
      msg: "El usuario ya existe",
    });
  }
};

/*** Método para iniciar sesión ***/
const loginUsuario = async (req, res) => {
  // Desestructurar información entrante
  const { email, password } = req.body;
  try {
    let usuario = await usuarioModel.findOne({ email });
    // Validar si el usuario no existe
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Correo o contraseña inválida",
      });
    }

    // Comparar contraseña ingresada con la registrada
    const passwordValido = bcryptjs.compareSync(password, usuario.password);

    // Validar contraseña
    if (!passwordValido) {
      return res.status(401).json({
        ok: false,
        msg: "Correo o contraseña inválida",
      });
    }

    // Generar payload
    const payload = {
      id: usuario.id,
    };

    // Firmar token
    jwt.sign(
      payload,
      process.env.LLAVE,
      { expiresIn: 3600 },
      (error, token) => {
        res.json({
          ok: true,
          id: usuario.id,
          username: usuario.username,
          msg: "Sesión iniciada correctamente",
          token: token,
        });
        // Imprimir registro de usuario
        console.log("Sesión iniciada correctamente");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Exportar métodos
module.exports = {
  loginUsuario,
  registrarUsuario,
};
