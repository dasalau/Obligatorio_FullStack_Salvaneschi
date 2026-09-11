import { store } from "../data/store.js";
import { turnoSchema } from "../validators/turnos.validators.js";

const getUserPlan = (userId) => {
  const user = store.users.find((item) => item.id === userId);
  return user ? user.plan : "plus";
};

export const getTurnos = (req, res) => {
  const { pagina = 1, limite = 10, estado, especialidadId } = req.query;

  let resultado = [...store.turnos];

  if (estado) {
    resultado = resultado.filter((turno) => turno.estado === estado);
  }

  if (especialidadId) {
    resultado = resultado.filter(
      (turno) => turno.especialidadId === especialidadId,
    );
  }

  const page = Number(pagina);
  const pageSize = Number(limite);
  const inicio = (page - 1) * pageSize;
  const fin = inicio + pageSize;

  return res.status(200).json({
    total: resultado.length,
    pagina: page,
    limite: pageSize,
    turnos: resultado.slice(inicio, fin),
  });
};

export const createTurno = (req, res) => {
  const { error, value } = turnoSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const paciente = store.pacientes.find((item) => item.id === value.pacienteId);
  if (!paciente) {
    return res.status(404).json({ message: "Paciente no encontrado" });
  }

  const especialidad = store.especialidades.find(
    (item) => item.id === value.especialidadId,
  );
  if (!especialidad) {
    return res.status(404).json({ message: "Especialidad no encontrada" });
  }

  const userPlan = getUserPlan(req.decoded.id);
  const turnosActivos = store.turnos.filter(
    (turno) => turno.createdBy === req.decoded.id,
  ).length;

  if (userPlan === "plus" && turnosActivos >= 4) {
    return res
      .status(403)
      .json({ message: "El plan plus solo permite 4 turnos activos" });
  }

  const nuevoTurno = {
    id: `t-${Date.now()}`,
    ...value,
    pacienteNombre: `${paciente.nombre} ${paciente.apellido}`,
    especialidadNombre: especialidad.nombre,
    createdBy: req.decoded.id,
    createdAt: new Date().toISOString(),
  };

  store.turnos.push(nuevoTurno);

  return res
    .status(201)
    .json({ message: "Turno creado correctamente", turno: nuevoTurno });
};

export const getTurnoById = (req, res) => {
  const turno = store.turnos.find((item) => item.id === req.params.id);

  if (!turno) {
    return res.status(404).json({ message: "Turno no encontrado" });
  }

  return res.status(200).json({ turno });
};

export const updateTurno = (req, res) => {
  const turno = store.turnos.find((item) => item.id === req.params.id);

  if (!turno) {
    return res.status(404).json({ message: "Turno no encontrado" });
  }

  const { error, value } = turnoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  Object.assign(turno, value);
  turno.pacienteNombre =
    `${store.pacientes.find((p) => p.id === value.pacienteId)?.nombre || ""} ${store.pacientes.find((p) => p.id === value.pacienteId)?.apellido || ""}`.trim();
  turno.especialidadNombre =
    store.especialidades.find((e) => e.id === value.especialidadId)?.nombre ||
    turno.especialidadNombre;

  return res.status(200).json({ message: "Turno actualizado", turno });
};

export const deleteTurno = (req, res) => {
  const index = store.turnos.findIndex((turno) => turno.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Turno no encontrado" });
  }

  const [turnoEliminado] = store.turnos.splice(index, 1);

  return res
    .status(200)
    .json({ message: "Turno eliminado", turno: turnoEliminado });
};
