import Turno from "../models/turno.model.js";

export const obtenerTurnosService = async ({
  estado,
  especialidadId,
  pagina = 1,
  limite = 10,
}) => {
  const filtro = {};

  if (estado) filtro.estado = estado;
  if (especialidadId) filtro.especialidadId = especialidadId;

  const total = await Turno.countDocuments(filtro);
  const turnos = await Turno.find(filtro)
    .sort({ createdAt: -1 })
    .skip((Number(pagina) - 1) * Number(limite))
    .limit(Number(limite));

  return {
    total,
    pagina: Number(pagina),
    limite: Number(limite),
    turnos,
  };
};

export const crearTurnoService = async (turnoData) => {
  const turno = new Turno(turnoData);
  return await turno.save();
};

export const obtenerTurnoPorIdService = async (id) => {
  return await Turno.findById(id);
};

export const actualizarTurnoService = async (id, turnoData) => {
  return await Turno.findByIdAndUpdate(id, turnoData, {
    new: true,
    runValidators: true,
  });
};

export const eliminarTurnoService = async (id) => {
  return await Turno.findByIdAndDelete(id);
};

export const contarTurnosPorUsuarioService = async (userId) => {
  return await Turno.countDocuments({ createdBy: userId });
};
