import { store } from "../data/store.js";
import { pacienteSchema } from "../validators/pacientes.validators.js";

export const getPacientes = (req, res) => {
  return res.status(200).json({ pacientes: store.pacientes });
};

export const createPaciente = (req, res) => {
  const { error, value } = pacienteSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const duplicado = store.pacientes.some(
    (paciente) => paciente.dni === value.dni,
  );
  if (duplicado) {
    return res
      .status(409)
      .json({ message: "Ya existe un paciente con ese DNI" });
  }

  const nuevoPaciente = {
    id: `p-${Date.now()}`,
    ...value,
    createdAt: new Date().toISOString(),
  };

  store.pacientes.push(nuevoPaciente);

  return res
    .status(201)
    .json({
      message: "Paciente creado correctamente",
      paciente: nuevoPaciente,
    });
};

export const updatePaciente = (req, res) => {
  const paciente = store.pacientes.find((item) => item.id === req.params.id);
  if (!paciente) {
    return res.status(404).json({ message: "Paciente no encontrado" });
  }

  const { error, value } = pacienteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  Object.assign(paciente, value);

  return res.status(200).json({ message: "Paciente actualizado", paciente });
};

export const deletePaciente = (req, res) => {
  const pacienteIndex = store.pacientes.findIndex(
    (item) => item.id === req.params.id,
  );

  if (pacienteIndex === -1) {
    return res.status(404).json({ message: "Paciente no encontrado" });
  }

  const [pacienteEliminado] = store.pacientes.splice(pacienteIndex, 1);

  return res
    .status(200)
    .json({ message: "Paciente eliminado", paciente: pacienteEliminado });
};
