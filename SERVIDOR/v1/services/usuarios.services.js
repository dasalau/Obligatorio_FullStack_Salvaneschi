import Usuario from "../models/usuario.model.js";

export const obtenerUsuarioPorIdService = async (id) => {
  return await Usuario.findOne({ id });
};

export const obtenerUsuarioPorUsernameService = async (username) => {
  return await Usuario.findOne({
    username: { $regex: `^${username}$`, $options: "i" },
  });
};

export const crearUsuarioService = async ({
  username,
  password,
  plan,
  role,
}) => {
  const nuevoUsuario = new Usuario({
    id: `u-${Date.now()}`,
    username,
    password,
    plan,
    role,
  });

  return await nuevoUsuario.save();
};

export const actualizarPlanUsuarioService = async (id, nuevoPlan) => {
  return await Usuario.findOneAndUpdate(
    { id },
    { plan: nuevoPlan },
    { new: true, runValidators: true },
  );
};
