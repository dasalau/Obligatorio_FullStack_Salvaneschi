export const obtenerJuegos = (req, res) => {
  res.status(200).json({
    message: "Obteniendo todos los juegos",
    juegos: [],
  });
};

export const crearJuego = (req, res) => {
  res.status(201).json({
    message: "Creando un nuevo juego",
    juego: req.validatedBody,
  });
};

export const obtenerJuegoPorNombre = (req, res) => {
  res.status(200).json({
    message: "Obteniendo el juego por nombre",
    juego: req.validatedParams,
  });
};
