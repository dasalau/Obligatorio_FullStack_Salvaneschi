import {
  obtenerUsuarioPorIdService,
  actualizarPlanUsuarioService,
} from "../services/usuarios.services.js";

const getUserResponse = (user) => {
  const usuario = user.toObject ? user.toObject() : user;

  return {
    id: usuario.id,
    username: usuario.username,
    plan: usuario.plan,
    role: usuario.role,
    createdAt: usuario.createdAt,
  };
};

export const getMiPerfil = async (req, res) => {
  try {
    const user = await obtenerUsuarioPorIdService(req.decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ user: getUserResponse(user) });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener perfil", error: error.message });
  }
};

export const cambiarPlan = async (req, res) => {
  try {
    const value = req.validatedBody;
    const user = await obtenerUsuarioPorIdService(req.decoded.id);

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
        user: getUserResponse(user),
      });
    }

    const usuarioActualizado = await actualizarPlanUsuarioService(
      req.decoded.id,
      value.plan,
    );

    return res.status(200).json({
      message: "Plan actualizado correctamente",
      user: getUserResponse(usuarioActualizado),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al cambiar el plan", error: error.message });
  }
};
