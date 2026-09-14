import Paciente from "../models/paciente.model.js";

export const obtenerPacientesService = async () => {
  return await Paciente.find().sort({ createdAt: -1 });
};

export const crearPacienteService = async (pacienteData) => {
  const paciente = new Paciente(pacienteData);
  return await paciente.save();
};

export const obtenerPacientePorIdService = async (id) => {
  return await Paciente.findById(id);
};

export const actualizarPacienteService = async (id, pacienteData) => {
  return await Paciente.findByIdAndUpdate(id, pacienteData, {
    new: true,
    runValidators: true,
  });
};

export const eliminarPacienteService = async (id) => {
  return await Paciente.findByIdAndDelete(id);
};
