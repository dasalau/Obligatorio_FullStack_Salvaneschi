import Joi from "joi";

export const turnoSchema = Joi.object({
  paciente: Joi.string().hex().length(24).required().messages({
    "string.hex": "El id del paciente debe ser hexadecimal",
    "string.length": "El id del paciente debe tener {#limit} caracteres",
    "string.empty": "El id del paciente no puede estar vacío",
    "any.required": "El paciente es obligatorio",
  }),
  fecha: Joi.string().required().messages({
    "string.empty": "La fecha no puede estar vacía",
    "any.required": "La fecha es obligatoria",
  }),
  hora: Joi.string().required().messages({
    "string.empty": "La hora no puede estar vacía",
    "any.required": "La hora es obligatoria",
  }),
  motivo: Joi.string().trim().min(5).required().messages({
    "string.min": "El motivo debe tener al menos {#limit} caracteres",
    "string.empty": "El motivo no puede estar vacío",
    "any.required": "El motivo es obligatorio",
  }),
  estado: Joi.string()
    .valid("pendiente", "confirmado", "cancelado", "atendido")
    .default("pendiente")
    .messages({
      "any.only":
        "El estado debe ser pendiente, confirmado, cancelado o atendido",
      "string.empty": "El estado no puede estar vacío",
    }),
  especialidad: Joi.string().hex().length(24).required().messages({
    "string.hex": "El id de la especialidad debe ser hexadecimal",
    "string.length": "El id de la especialidad debe tener {#limit} caracteres",
    "string.empty": "El id de la especialidad no puede estar vacío",
    "any.required": "La especialidad es obligatoria",
  }),
  imagen: Joi.string().allow("").optional().messages({
    "string.base": "La imagen debe ser un texto",
  }),
});

export const turnoIdSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "El id no puede estar vacío",
    "any.required": "El id es obligatorio",
  }),
});
