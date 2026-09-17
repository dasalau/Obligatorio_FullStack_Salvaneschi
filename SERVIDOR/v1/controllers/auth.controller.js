import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  obtenerUsuarioPorUsernameService,
  crearUsuarioService,
} from "../services/usuarios.services.js";

const getSecretKey = () => process.env.SECRET_KEY;

export const ingresarUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usuarioExistente = await obtenerUsuarioPorUsernameService(username);

    if (!usuarioExistente) {
      return res.status(401).json({ message: "credenciales incorrectas" });
    }

    const validPassword = bcrypt.compareSync(
      password,
      usuarioExistente.password,
    );

    if (!validPassword) {
      return res.status(401).json({ message: "credenciales incorrectas" });
    }

    const token = jwt.sign(
      {
        id: usuarioExistente.id,
        username: usuarioExistente.username,
        role: usuarioExistente.role,
      },
      getSecretKey(),
      { expiresIn: "1h" },
    );

    const usuarioPublico = usuarioExistente.toObject
      ? usuarioExistente.toObject()
      : usuarioExistente;

    return res.status(200).json({
      message: "Iniciando sesión",
      user: {
        id: usuarioPublico.id,
        username: usuarioPublico.username,
        plan: usuarioPublico.plan,
        role: usuarioPublico.role,
        createdAt: usuarioPublico.createdAt,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
};

export const registrarUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usuarioExistente = await obtenerUsuarioPorUsernameService(username);

    if (usuarioExistente) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const nuevoUsuario = await crearUsuarioService({
      username,
      password: hashedPassword,
      plan: "plus",
      role: "user",
    });

    const token = jwt.sign(
      {
        id: nuevoUsuario.id,
        username: nuevoUsuario.username,
        role: nuevoUsuario.role,
      },
      getSecretKey(),
      { expiresIn: "1h" },
    );

    const usuarioPublico = nuevoUsuario.toObject
      ? nuevoUsuario.toObject()
      : nuevoUsuario;

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id: usuarioPublico.id,
        username: usuarioPublico.username,
        plan: usuarioPublico.plan,
        role: usuarioPublico.role,
        createdAt: usuarioPublico.createdAt,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
};
