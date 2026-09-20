import Usuario from "../models/usuario.model.js";
import Plan from "../models/plan.model.js";
import { sanitizeUser } from "../utils/user.utils.js";

export const getMiPerfilService = async (userId) => {
  const user = await Usuario.findById(userId).populate("role").populate("plan");

  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  return sanitizeUser(user);
};

export const cambiarPlanService = async (userId, value) => {
  const user = await Usuario.findById(userId).populate("role").populate("plan");

  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    throw error;
  }

  const planActual = user.plan?.codigo || "plus";
  const nuevoPlan = await Plan.findOne({ codigo: value.plan });

  if (!nuevoPlan) {
    const error = new Error("Plan no encontrado");
    error.status = 404;
    throw error;
  }

  if (planActual !== "plus" && nuevoPlan.codigo === "premium") {
    const error = new Error("Solo puedes cambiar a premium desde el plan plus");
    error.status = 400;
    throw error;
  }

  if (planActual === "premium" && nuevoPlan.codigo === "premium") {
    return {
      message: "Ya tienes el plan premium activo",
      user: sanitizeUser(user),
    };
  }

  user.plan = nuevoPlan._id;
  await user.save();

  const updated = await Usuario.findById(userId)
    .populate("role")
    .populate("plan");

  return {
    message: "Plan actualizado correctamente",
    user: sanitizeUser(updated),
  };
};
