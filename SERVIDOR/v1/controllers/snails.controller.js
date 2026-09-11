export const obtenerCaracoles = (req, res) => {
  res.status(200).json({
    message: "Obteniendo todos los caracoles",
    caracoles: [],
  });
};

export const crearCaracol = (req, res) => {
  res.status(201).json({
    message: "Creando un nuevo caracol",
    caracol: req.validatedBody,
  });
};

export const obtenerCaracolPorNombre = (req, res) => {
  res.status(200).json({
    message: "Obteniendo el caracol por nombre",
    caracol: req.validatedParams,
  });
};
