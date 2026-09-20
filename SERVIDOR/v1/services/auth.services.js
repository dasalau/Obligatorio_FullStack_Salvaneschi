import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Usuario from "../models/usuario.model.js";
import { sanitizeUser } from "../utils/user.utils.js";

const getSecretKey = () => process.env.SECRET_KEY;

export const loginUsuarioService = async ({ username, password }) => {
  const usuarioExistente = await Usuario.findOne({
    username: new RegExp(`^${username}$`, "i"),
  });

  if (!usuarioExistente) {
    const error = new Error("credenciales incorrectas");
    error.status = 401;
    throw error;
  }

  const validPassword = bcrypt.compareSync(password, usuarioExistente.password);
  if (!validPassword) {
    const error = new Error("credenciales incorrectas");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: usuarioExistente._id.toString(),
      username: usuarioExistente.username,
      role: usuarioExistente.role,
      plan: usuarioExistente.plan,
    },
    getSecretKey(),
    { expiresIn: "1h" },
  );

  return {
    message: "Iniciando sesión",
    user: sanitizeUser(usuarioExistente),
    token,
  };
};

export const registrarUsuarioService = async ({ username, password }) => {
  const usuarioExistente = await Usuario.findOne({
    username: new RegExp(`^${username}$`, "i"),
  });

  if (usuarioExistente) {
    const error = new Error("El usuario ya existe");
    error.status = 409;
    throw error;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  const nuevo = new Usuario({ username, password: hashedPassword });
  const saved = await nuevo.save();

  const token = jwt.sign(
    {
      id: saved._id.toString(),
      username: saved.username,
      role: saved.role,
      plan: saved.plan,
    },
    getSecretKey(),
    { expiresIn: "1h" },
  );

  return {
    message: "Usuario registrado con éxito",
    user: sanitizeUser(saved),
    token,
  };
};
