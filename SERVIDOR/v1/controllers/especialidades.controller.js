import { store } from "../data/store.js";

export const getEspecialidades = (req, res) => {
  return res.status(200).json({ especialidades: store.especialidades });
};

export const createEspecialidad = (req, res) => {
  const value = req.validatedBody;

  const existe = store.especialidades.some(
    (item) => item.nombre.toLowerCase() === value.nombre.toLowerCase(),
  );
  if (existe) {
    return res
      .status(409)
      .json({ message: "Ya existe una especialidad con ese nombre" });
  }

  const nuevaEspecialidad = {
    id: `e-${Date.now()}`,
    ...value,
    createdAt: new Date().toISOString(),
  };

  store.especialidades.push(nuevaEspecialidad);

  return res
    .status(201)
    .json({ message: "Especialidad creada", especialidad: nuevaEspecialidad });
};

export const deleteEspecialidad = (req, res) => {
  const especialidad = store.especialidades.find(
    (item) => item.id === req.validatedParams.id,
  );

  if (!especialidad) {
    return res.status(404).json({ message: "Especialidad no encontrada" });
  }

  const tieneTurnos = store.turnos.some(
    (turno) => turno.especialidadId === req.validatedParams.id,
  );
  if (tieneTurnos) {
    return res.status(409).json({
      message:
        "No se puede eliminar una especialidad que tiene turnos asociados",
    });
  }

  const index = store.especialidades.findIndex(
    (item) => item.id === req.validatedParams.id,
  );
  const [eliminada] = store.especialidades.splice(index, 1);

  return res
    .status(200)
    .json({ message: "Especialidad eliminada", especialidad: eliminada });
};
