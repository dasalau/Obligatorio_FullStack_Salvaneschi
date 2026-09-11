import Joi from "joi";

export const crearCaracolSchema = Joi.object({
  nombre: Joi.string().trim().required().min(3).max(50).messages({
    "string.base": "El nombre del caracol debe ser texto",
    "string.empty": "El nombre del caracol no puede estar vacío",
    "string.min":
      "El nombre del caracol debe tener al menos {#limit} caracteres",
    "string.max":
      "El nombre del caracol no puede tener más de {#limit} caracteres",
  }),
  descripcion: Joi.string().trim().required().min(5).max(200).messages({
    "string.base": "La descripción debe ser texto",
    "string.empty": "La descripción no puede estar vacía",
    "string.min": "La descripción debe tener al menos {#limit} caracteres",
    "string.max": "La descripción no puede tener más de {#limit} caracteres",
  }),
  edad: Joi.number().required().min(0).messages({
    "number.base": "La edad debe ser un número",
    "number.empty": "La edad no puede estar vacía",
    "number.min": "La edad no puede ser negativa",
  }),
});

export const obtenerCaracolPorNombreSchema = Joi.object({
  nombre: Joi.string().trim().required().min(3).max(50).messages({
    "string.base": "El nombre del caracol debe ser texto",
    "string.empty": "El nombre del caracol no puede estar vacío",
    "string.min":
      "El nombre del caracol debe tener al menos {#limit} caracteres",
    "string.max":
      "El nombre del caracol no puede tener más de {#limit} caracteres",
  }),
});
