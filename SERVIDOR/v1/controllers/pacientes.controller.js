import cloudinary from "../config/cloudinary.js";
import {
  obtenerPacientesService,
  crearPacienteService,
  obtenerPacientePorIdService,
  obtenerPacientePorCedulaService,
  actualizarPacienteService,
  eliminarPacienteService,
  agregarImagenPacienteService,
} from "../services/pacientes.services.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.util.js";

const subirImagenYDevolverUrl = async (req) => {
  if (!req.file) return null;

  const folder = req.body?.folder || "pacientes";
  const result = await uploadBufferToCloudinary(cloudinary, req.file.buffer, {
    resource_type: "auto",
    folder,
  });

  return result.secure_url;
};

export const getPacientes = async (req, res, next) => {
  const pacientes = await obtenerPacientesService();
  return res.status(200).json({ pacientes });
};

export const createPaciente = async (req, res, next) => {
  const value = req.validatedBody;
  const pacienteExistente = await obtenerPacientePorCedulaService(value.cedula);
  if (pacienteExistente) {
    const error = new Error("Ya existe un paciente con esa cédula");
    error.status = 409;
    return next(error);
  }

  const imagenUrl = await subirImagenYDevolverUrl(req);
  const pacientePayload = {
    ...value,
    ...(imagenUrl ? { imagenes: [imagenUrl] } : {}),
  };

  const paciente = await crearPacienteService(pacientePayload);
  return res.status(201).json({
    message: "Paciente creado correctamente",
    paciente,
  });
};

export const updatePaciente = async (req, res, next) => {
  const { id } = req.validatedParams;
  const value = req.validatedBody;

  const paciente = await actualizarPacienteService(id, value);

  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    error.status = 404;
    return next(error);
  }

  return res.status(200).json({ message: "Paciente actualizado", paciente });
};

export const deletePaciente = async (req, res, next) => {
  const { id } = req.validatedParams;
  const paciente = await eliminarPacienteService(id);

  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    error.status = 404;
    return next(error);
  }

  return res.status(200).json({ message: "Paciente eliminado", paciente });
};

export const getPacienteById = async (req, res, next) => {
  const { id } = req.validatedParams;
  const paciente = await obtenerPacientePorIdService(id);

  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    error.status = 404;
    return next(error);
  }

  return res.status(200).json({ paciente });
};

export const addPacienteImagen = async (req, res, next) => {
  const { id } = req.validatedParams;
  const url = req.file ? await subirImagenYDevolverUrl(req) : req.validatedBody.url;

  if (!url) {
    const error = new Error("Debe enviar una imagen o una URL válida");
    error.status = 400;
    return next(error);
  }

  const paciente = await agregarImagenPacienteService(id, url);

  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    error.status = 404;
    return next(error);
  }

  return res.status(200).json({
    message: "Imagen agregada al paciente",
    paciente,
  });
};
