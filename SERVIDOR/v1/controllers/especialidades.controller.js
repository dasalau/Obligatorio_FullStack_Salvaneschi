import {
  obtenerEspecialidadesService,
  crearEspecialidadService,
  eliminarEspecialidadService,
  actualizarEspecialidadService,
} from "../services/especialidades.services.js";

export const getEspecialidades = async (req, res, next) => {
  const especialidades = await obtenerEspecialidadesService();
  return res.status(200).json({ especialidades });
};

export const createEspecialidad = async (req, res, next) => {
  const value = req.validatedBody;
  const esp = await crearEspecialidadService(value);
  return res
    .status(201)
    .json({ message: "Especialidad creada", especialidad: esp });
};

export const deleteEspecialidad = async (req, res, next) => {
  const deleted = await eliminarEspecialidadService(req.validatedParams.id);
  return res
    .status(200)
    .json({ message: "Especialidad eliminada", especialidad: deleted });
};

export const updateEspecialidad = async (req, res, next) => {
  const updated = await actualizarEspecialidadService(
    req.validatedParams.id,
    req.validatedBody,
  );
  return res
    .status(200)
    .json({ message: "Especialidad actualizada", especialidad: updated });
};
