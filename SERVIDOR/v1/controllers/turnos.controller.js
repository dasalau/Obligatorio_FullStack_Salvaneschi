import {
  getTurnosService,
  createTurnoService,
  countActiveTurnosByUser,
  getTurnoByIdService,
  updateTurnoService,
  deleteTurnoService,
} from "../services/turnos.services.js";

export const getTurnos = async (req, res, next) => {
  const { pagina = 1, limite = 10, estado, especialidad } = req.query;
  const result = await getTurnosService({
    page: pagina,
    limit: limite,
    estado,
    especialidad,
  });

  const populated = result.turnos;

  return res.status(200).json({
    total: result.total,
    pagina: result.page,
    limite: result.limit,
    totalPages: result.totalPages,
    turnos: populated,
  });
};

export const createTurno = async (req, res, next) => {
  const value = req.validatedBody;

  const creado = await createTurnoService(value, req.decoded.id);
  return res.status(201).json({
    message: "Turno creado correctamente",
    turno: creado,
  });
};

export const getTurnoById = async (req, res, next) => {
  const turno = await getTurnoByIdService(req.validatedParams.id);
  if (!turno) {
    const error = new Error("Turno no encontrado");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({ turno });
};

export const updateTurno = async (req, res, next) => {
  const updated = await updateTurnoService(
    req.validatedParams.id,
    req.validatedBody,
  );
  if (!updated) {
    const error = new Error("Turno no encontrado");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({ message: "Turno actualizado", turno: updated });
};

export const deleteTurno = async (req, res, next) => {
  const deleted = await deleteTurnoService(req.validatedParams.id);
  if (!deleted) {
    const error = new Error("Turno no encontrado");
    error.status = 404;
    throw error;
  }

  return res.status(200).json({ message: "Turno eliminado", turno: deleted });
};
