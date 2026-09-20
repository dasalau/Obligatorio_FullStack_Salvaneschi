import Turno from "../models/turno.model.js";
import Paciente from "../models/paciente.model.js";
import Especialidad from "../models/especialidad.model.js";

export const getTurnosService = async ({
  page = 1,
  limit = 10,
  estado,
  especialidad,
}) => {
  const query = {};
  if (estado) query.estado = estado;
  if (especialidad) query.especialidad = especialidad;

  const pageNum = Number(page) || 1;
  const lim = Number(limit) || 10;
  const skip = (pageNum - 1) * lim;

  const total = await Turno.countDocuments(query);
  const totalPages = Math.ceil(total / lim) || 1;

  const turnos = await Turno.find(query)
    .skip(skip)
    .limit(lim)
    .sort({ createdAt: -1 })
    .populate("paciente", "nombre apellido cedula telefono email")
    .populate("especialidad", "nombre descripcion");

  return { turnos, total, page: pageNum, limit: lim, totalPages };
};

export const createTurnoService = async (value, userId, userPlan = "plus") => {
  const turnosActivos = await countActiveTurnosByUser(userId);
  if (userPlan === "plus" && turnosActivos >= 4) {
    const error = new Error("El plan plus solo permite 4 turnos activos");
    error.status = 403;
    throw error;
  }

  const paciente = await Paciente.findById(value.paciente);
  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    error.status = 404;
    throw error;
  }

  const especialidad = await Especialidad.findById(value.especialidad);
  if (!especialidad) {
    const error = new Error("Especialidad no encontrada");
    error.status = 404;
    throw error;
  }

  const nuevo = {
    fecha: value.fecha,
    hora: value.hora,
    motivo: value.motivo || "",
    estado: value.estado || "pendiente",
    imagen: value.imagen || "",
    createdBy: userId,
    paciente: paciente._id,
    especialidad: especialidad._id,
  };

  const creado = await Turno.create(nuevo);
  const populated = await Turno.findById(creado._id)
    .populate("paciente", "nombre apellido cedula telefono email")
    .populate("especialidad", "nombre descripcion");
  return populated;
};

export const countActiveTurnosByUser = async (userId) => {
  return Turno.countDocuments({
    createdBy: userId,
    estado: { $in: ["pendiente", "confirmado"] },
  });
};

export const getTurnoByIdService = async (id) => {
  const turno = await Turno.findById(id)
    .populate("paciente", "nombre apellido cedula telefono email")
    .populate("especialidad", "nombre descripcion");
  return turno;
};

export const updateTurnoService = async (id, data) => {
  const updated = await Turno.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate("paciente", "nombre apellido cedula telefono email")
    .populate("especialidad", "nombre descripcion");
  return updated;
};

export const deleteTurnoService = async (id) => {
  const deleted = await Turno.findById(id)
    .populate("paciente", "nombre apellido cedula telefono email")
    .populate("especialidad", "nombre descripcion");
  if (!deleted) return null;
  await Turno.findByIdAndDelete(id);
  return deleted;
};
