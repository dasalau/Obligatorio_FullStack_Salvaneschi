import {
  obtenerEspecialidadesService,
  crearEspecialidadService,
  obtenerEspecialidadPorNombreService,
  eliminarEspecialidadService,
} from "../services/especialidades.services.js";
import Turno from "../models/turno.model.js";

export const getEspecialidades = async (req, res) => {
  try {
    const especialidades = await obtenerEspecialidadesService();
    return res.status(200).json({ especialidades });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error al obtener especialidades",
        error: error.message,
      });
  }
};

export const createEspecialidad = async (req, res) => {
  try {
    const value = req.validatedBody;

    const existe = await obtenerEspecialidadPorNombreService(value.nombre);
    if (existe) {
      return res
        .status(409)
        .json({ message: "Ya existe una especialidad con ese nombre" });
    }

    const especialidad = await crearEspecialidadService(value);
    return res.status(201).json({
      message: "Especialidad creada",
      especialidad,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear especialidad", error: error.message });
  }
};

export const deleteEspecialidad = async (req, res) => {
  try {
    const { id } = req.validatedParams;

    const especialidad = await obtenerEspecialidadPorIdService(id);
    if (!especialidad) {
      return res.status(404).json({ message: "Especialidad no encontrada" });
    }

    const tieneTurnos = await Turno.exists({ especialidadId: id });
    if (tieneTurnos) {
      return res.status(409).json({
        message:
          "No se puede eliminar una especialidad que tiene turnos asociados",
      });
    }

    const eliminada = await eliminarEspecialidadService(id);
    return res.status(200).json({
      message: "Especialidad eliminada",
      especialidad: eliminada,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error al eliminar especialidad",
        error: error.message,
      });
  }
};

const obtenerEspecialidadPorIdService = async (id) => {
  return await (
    await import("../models/especialidad.model.js")
  ).default.findById(id);
};
