import Especialidad from "../models/especialidad.model.js";
import Turno from "../models/turno.model.js";

export const obtenerEspecialidadesService = async () => {
  return await Especialidad.find().sort({ createdAt: -1 });
};

export const crearEspecialidadService = async (value) => {
  // Evitar duplicados por nombre
  const existe = await Especialidad.findOne({
    nombre: new RegExp(`^${value.nombre}$`, "i"),
  });
  if (existe) {
    const error = new Error("Ya existe una especialidad con ese nombre");
    error.status = 409;
    throw error;
  }

  const esp = new Especialidad(value);
  return await esp.save();
};

export const eliminarEspecialidadService = async (id) => {
  // Verificar turnos asociados
  const tieneTurnos = await Turno.exists({ especialidadId: id });
  if (tieneTurnos) {
    const error = new Error(
      "No se puede eliminar una especialidad que tiene turnos asociados",
    );
    error.status = 409;
    throw error;
  }

  const deleted = await Especialidad.findByIdAndDelete(id);
  return deleted;
};

export const obtenerEspecialidadPorIdService = async (id) => {
  return await Especialidad.findById(id);
};

export const actualizarEspecialidadService = async (id, data) => {
  return await Especialidad.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};
