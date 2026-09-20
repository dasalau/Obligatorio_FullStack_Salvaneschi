import Usuario from "../models/usuario.model.js";
import { sanitizeUser } from "../utils/user.utils.js";

export const getMiPerfilService = async (userId) => {
  const user = await Usuario.findById(userId);

  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  return sanitizeUser(user);
};

export const cambiarPlanService = async (userId, value) => {
  const user = await Usuario.findById(userId);

  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  if (user.plan !== "plus" && value.plan === "premium") {
    const error = new Error("Solo puedes cambiar a premium desde el plan plus");
    error.status = 400;
    throw error;
  }

  if (user.plan === "premium" && value.plan === "premium") {
    return {
      message: "Ya tienes el plan premium activo",
      user: sanitizeUser(user),
    };
  }

  user.plan = value.plan;
  await user.save();

  return {
    message: "Plan actualizado correctamente",
    user: sanitizeUser(user),
  };
};
