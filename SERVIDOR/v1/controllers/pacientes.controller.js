import {
  obtenerPacientesService,
  crearPacienteService,
  obtenerPacientePorIdService,
  actualizarPacienteService,
  eliminarPacienteService,
} from "../services/pacientes.services.js";

export const getPacientes = async (req, res) => {
  try {
    const pacientes = await obtenerPacientesService();
    return res.status(200).json({ pacientes });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener pacientes", error: error.message });
  }
};

export const createPaciente = async (req, res) => {
  try {
    const value = req.validatedBody;

    const pacienteExistente = await obtenerPacientePorDniService(value.dni);
    if (pacienteExistente) {
      return res
        .status(409)
        .json({ message: "Ya existe un paciente con ese DNI" });
    }

    const paciente = await crearPacienteService(value);
    return res.status(201).json({
      message: "Paciente creado correctamente",
      paciente,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear paciente", error: error.message });
  }
};

export const updatePaciente = async (req, res) => {
  try {
    const { id } = req.validatedParams;
    const value = req.validatedBody;

    const paciente = await actualizarPacienteService(id, value);

    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    return res.status(200).json({ message: "Paciente actualizado", paciente });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar paciente", error: error.message });
  }
};

export const deletePaciente = async (req, res) => {
  try {
    const { id } = req.validatedParams;
    const paciente = await eliminarPacienteService(id);

    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    return res.status(200).json({ message: "Paciente eliminado", paciente });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar paciente", error: error.message });
  }
};

export const getPacienteById = async (req, res) => {
  try {
    const { id } = req.validatedParams;
    const paciente = await obtenerPacientePorIdService(id);

    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    return res.status(200).json({ paciente });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener paciente", error: error.message });
  }
};

const obtenerPacientePorDniService = async (dni) => {
  const Paciente = (await import("../models/paciente.model.js")).default;
  return await Paciente.findOne({ dni });
};
