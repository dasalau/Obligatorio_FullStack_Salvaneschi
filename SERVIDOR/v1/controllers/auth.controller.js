import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { store, sanitizeUser } from "../data/store.js";

const getSecretKey = () => process.env.SECRET_KEY;

export const ingresarUsuario = (req, res) => {
  const { username, password } = req.body;

  const usuarioExistente = store.users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase(),
  );

  if (!usuarioExistente) {
    return res.status(401).json({ message: "credenciales incorrectas" });
  }

  const validPassword = bcrypt.compareSync(password, usuarioExistente.password);

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

  return res.status(200).json({
    message: "Iniciando sesión",
    user: sanitizeUser(usuarioExistente),
    token,
  });
};

export const registrarUsuario = (req, res) => {
  const { username, password } = req.body;

  const usuarioExistente = store.users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase(),
  );

  if (usuarioExistente) {
    return res.status(409).json({ message: "El usuario ya existe" });
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  const nuevoUsuario = {
    id: `u-${Date.now()}`,
    username,
    password: hashedPassword,
    plan: "plus",
    role: "user",
    createdAt: new Date().toISOString(),
  };

  store.users.push(nuevoUsuario);

  const token = jwt.sign(
    {
      id: nuevoUsuario.id,
      username: nuevoUsuario.username,
      role: nuevoUsuario.role,
    },
    getSecretKey(),
    { expiresIn: "1h" },
  );

  return res.status(201).json({
    message: "Usuario registrado con éxito",
    user: sanitizeUser(nuevoUsuario),
    token,
  });
};
