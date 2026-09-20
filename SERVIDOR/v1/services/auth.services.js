import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Usuario from "../models/usuario.model.js";
import Rol from "../models/rol.model.js";
import Plan from "../models/plan.model.js";
import { sanitizeUser } from "../utils/user.utils.js";

const getSecretKey = () => process.env.SECRET_KEY;

const getUserRoleAndPlan = async (usuario) => {
  const [roleDoc, planDoc] = await Promise.all([
    usuario.role ? Rol.findById(usuario.role) : null,
    usuario.plan ? Plan.findById(usuario.plan) : null,
  ]);

  return {
    roleCode: roleDoc ? roleDoc.codigo : "user",
    planCode: planDoc ? planDoc.codigo : "plus",
  };
};

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

  const { roleCode, planCode } = await getUserRoleAndPlan(usuarioExistente);

  const token = jwt.sign(
    {
      id: usuarioExistente._id.toString(),
      username: usuarioExistente.username,
      role: roleCode,
      plan: planCode,
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

  const [roleDoc, planDoc] = await Promise.all([
    Rol.findOne({ codigo: "user" }),
    Plan.findOne({ codigo: "plus" }),
  ]);

  if (!roleDoc || !planDoc) {
    const error = new Error("Faltan los datos base de roles y planes");
    error.status = 500;
    throw error;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  const nuevo = new Usuario({
    username,
    password: hashedPassword,
    role: roleDoc._id,
    plan: planDoc._id,
  });
  const saved = await nuevo.save();

  const token = jwt.sign(
    {
      id: saved._id.toString(),
      username: saved.username,
      role: "user",
      plan: "plus",
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
