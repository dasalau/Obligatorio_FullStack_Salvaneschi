import { store, sanitizeUser } from "../data/store.js";

export const getMiPerfil = (req, res) => {
  const user = store.users.find((item) => item.id === req.decoded.id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.status(200).json({ user: sanitizeUser(user) });
};

export const cambiarPlan = (req, res) => {
  const value = req.validatedBody;

  const user = store.users.find((item) => item.id === req.decoded.id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (user.plan !== "plus" && value.plan === "premium") {
    return res
      .status(400)
      .json({ message: "Solo puedes cambiar a premium desde el plan plus" });
  }

  if (user.plan === "premium" && value.plan === "premium") {
    return res.status(200).json({
      message: "Ya tienes el plan premium activo",
      user: sanitizeUser(user),
    });
  }

  user.plan = value.plan;

  return res.status(200).json({
    message: "Plan actualizado correctamente",
    user: sanitizeUser(user),
  });
};
