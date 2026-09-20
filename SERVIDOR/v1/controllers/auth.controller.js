import {
  loginUsuarioService,
  registrarUsuarioService,
} from "../services/auth.services.js";

export const ingresarUsuario = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await loginUsuarioService({ username, password });
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

export const registrarUsuario = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await registrarUsuarioService({ username, password });
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};
