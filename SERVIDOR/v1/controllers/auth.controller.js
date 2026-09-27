import {
  loginUsuarioService,
  registrarUsuarioService,
} from "../services/auth.services.js";

export const ingresarUsuario = async (req, res, next) => {
  const { username, password } = req.body;
  const result = await loginUsuarioService({ username, password });
  return res.status(200).json(result);
};

export const registrarUsuario = async (req, res, next) => {
  const { username, password } = req.body;
  const result = await registrarUsuarioService({ username, password });
  return res.status(201).json(result);
};
