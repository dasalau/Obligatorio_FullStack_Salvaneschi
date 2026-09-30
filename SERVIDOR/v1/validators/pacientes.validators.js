import Joi from "joi";

export const pacienteSchema = Joi.object({
  nombre: Joi.string().trim().min(2).required().messages({
    "string.min": "El nombre debe tener al menos {#limit} caracteres",
    "string.empty": "El nombre no puede estar vacío",
    "any.required": "El nombre es obligatorio",
  }),
  apellido: Joi.string().trim().min(2).required().messages({
    "string.min": "El apellido debe tener al menos {#limit} caracteres",
    "string.empty": "El apellido no puede estar vacío",
    "any.required": "El apellido es obligatorio",
  }),
  cedula: Joi.string()
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": "La cédula debe contener solo números",
      "string.empty": "La cédula no puede estar vacía",
      "any.required": "La cédula es obligatoria",
    }),
  telefono: Joi.string().required().messages({
    "string.empty": "El teléfono no puede estar vacío",
    "any.required": "El teléfono es obligatorio",
  }),
  email: Joi.string().email().optional().allow("").messages({
    "string.email": "El email debe tener un formato válido",
  }),
  folder: Joi.string().optional().allow(""),
}).unknown(true);

export const pacienteIdSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "El id no puede estar vacío",
    "any.required": "El id es obligatorio",
  }),
});

export const pacienteImagenSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    "string.uri": "La URL de la imagen debe ser válida",
    "string.empty": "La URL de la imagen no puede estar vacía",
    "any.required": "La URL de la imagen es obligatoria",
  }),
});
