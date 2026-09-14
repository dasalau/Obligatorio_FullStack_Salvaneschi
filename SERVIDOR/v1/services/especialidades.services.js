import Especialidad from "../models/especialidad.model.js";

export const obtenerEspecialidadesService = async () => {
  return await Especialidad.find().sort({ createdAt: -1 });
};

export const crearEspecialidadService = async (especialidadData) => {
  const especialidad = new Especialidad(especialidadData);
  return await especialidad.save();
};

export const obtenerEspecialidadPorNombreService = async (nombre) => {
  return await Especialidad.findOne({
    nombre: { $regex: new RegExp(`^${nombre}$`, "i") },
  });
};

export const eliminarEspecialidadService = async (id) => {
  return await Especialidad.findByIdAndDelete(id);
};
