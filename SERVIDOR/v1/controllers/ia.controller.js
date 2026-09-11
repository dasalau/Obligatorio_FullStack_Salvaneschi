export const sugerirEspecialidad = (req, res) => {
  const { descripcion } = req.body;

  if (!descripcion || descripcion.trim().length < 5) {
    return res.status(400).json({ message: "La descripción es obligatoria" });
  }

  const texto = descripcion.toLowerCase();

  let sugerencia = "Rehabilitación";

  if (
    texto.includes("dolor") ||
    texto.includes("hombro") ||
    texto.includes("espalda")
  ) {
    sugerencia = "Rehabilitación";
  }

  if (
    texto.includes("postura") ||
    texto.includes("movimiento") ||
    texto.includes("músculo")
  ) {
    sugerencia = "Kinesiología";
  }

  if (
    texto.includes("equilibrio") ||
    texto.includes("control") ||
    texto.includes("estabilidad")
  ) {
    sugerencia = "Control postural";
  }

  return res.status(200).json({
    message: "Se generó una sugerencia de especialidad",
    sugerencia,
    descripcion,
  });
};
