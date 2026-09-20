import {
  getMiPerfilService,
  cambiarPlanService,
} from "../services/usuarios.services.js";

export const getMiPerfil = async (req, res, next) => {
  try {
    const user = await getMiPerfilService(req.decoded.id);
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};

export const cambiarPlan = async (req, res, next) => {
  try {
    const value = req.validatedBody;
    const result = await cambiarPlanService(req.decoded.id, value);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
