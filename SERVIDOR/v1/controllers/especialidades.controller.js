import {
  obtenerEspecialidadesService,
  crearEspecialidadService,
  eliminarEspecialidadService,
  actualizarEspecialidadService,
} from "../services/especialidades.services.js";

export const getEspecialidades = async (req, res, next) => {
  try {
    const especialidades = await obtenerEspecialidadesService();
    return res.status(200).json({ especialidades });
  } catch (error) {
    next(error);
  }
};

export const createEspecialidad = async (req, res, next) => {
  try {
    const value = req.validatedBody;
    const esp = await crearEspecialidadService(value);
    return res
      .status(201)
      .json({ message: "Especialidad creada", especialidad: esp });
  } catch (error) {
    next(error);
  }
};

export const deleteEspecialidad = async (req, res, next) => {
  try {
    const deleted = await eliminarEspecialidadService(req.validatedParams.id);
    return res
      .status(200)
      .json({ message: "Especialidad eliminada", especialidad: deleted });
  } catch (error) {
    next(error);
  }
};

export const updateEspecialidad = async (req, res, next) => {
  try {
    const updated = await actualizarEspecialidadService(
      req.validatedParams.id,
      req.validatedBody,
    );
    return res
      .status(200)
      .json({ message: "Especialidad actualizada", especialidad: updated });
  } catch (error) {
    next(error);
  }
};
