import {
  obtenerTurnosService,
  crearTurnoService,
  obtenerTurnoPorIdService,
  actualizarTurnoService,
  eliminarTurnoService,
  contarTurnosPorUsuarioService,
} from "../services/turnos.services.js";
import Paciente from "../models/paciente.model.js";
import Especialidad from "../models/especialidad.model.js";
import Usuario from "../models/usuario.model.js";

const getUserPlan = async (userId) => {
  const user = await Usuario.findOne({ id: userId });
  return user ? user.plan : "plus";
};

export const getTurnos = async (req, res) => {
  try {
    const { pagina = 1, limite = 10, estado, especialidadId } = req.query;
    const resultado = await obtenerTurnosService({
      estado,
      especialidadId,
      pagina,
      limite,
    });
    return res.status(200).json(resultado);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener turnos", error: error.message });
  }
};

export const createTurno = async (req, res) => {
  try {
    const value = req.validatedBody;

    const paciente = await Paciente.findById(value.pacienteId);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const especialidad = await Especialidad.findById(value.especialidadId);
    if (!especialidad) {
      return res.status(404).json({ message: "Especialidad no encontrada" });
    }

    const userPlan = await getUserPlan(req.decoded.id);
    const turnosActivos = await contarTurnosPorUsuarioService(req.decoded.id);

    if (userPlan === "plus" && turnosActivos >= 4) {
      return res
        .status(403)
        .json({ message: "El plan plus solo permite 4 turnos activos" });
    }

    const nuevoTurno = await crearTurnoService({
      ...value,
      pacienteNombre: `${paciente.nombre} ${paciente.apellido}`,
      especialidadNombre: especialidad.nombre,
      createdBy: req.decoded.id,
    });

    return res
      .status(201)
      .json({ message: "Turno creado correctamente", turno: nuevoTurno });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear turno", error: error.message });
  }
};

export const getTurnoById = async (req, res) => {
  try {
    const { id } = req.validatedParams;
    const turno = await obtenerTurnoPorIdService(id);

    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    return res.status(200).json({ turno });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener turno", error: error.message });
  }
};

export const updateTurno = async (req, res) => {
  try {
    const { id } = req.validatedParams;
    const value = req.validatedBody;

    const turnoActual = await obtenerTurnoPorIdService(id);
    if (!turnoActual) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    if (value.pacienteId) {
      const paciente = await Paciente.findById(value.pacienteId);
      if (paciente) {
        value.pacienteNombre = `${paciente.nombre} ${paciente.apellido}`;
      }
    }

    if (value.especialidadId) {
      const especialidad = await Especialidad.findById(value.especialidadId);
      if (especialidad) {
        value.especialidadNombre = especialidad.nombre;
      }
    }

    const turno = await actualizarTurnoService(id, value);
    return res.status(200).json({ message: "Turno actualizado", turno });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar turno", error: error.message });
  }
};

export const deleteTurno = async (req, res) => {
  try {
    const { id } = req.validatedParams;
    const turno = await eliminarTurnoService(id);

    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    return res.status(200).json({ message: "Turno eliminado", turno });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar turno", error: error.message });
  }
};
