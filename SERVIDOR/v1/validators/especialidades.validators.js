import Joi from "joi";

export const especialidadSchema = Joi.object({
  nombre: Joi.string().trim().min(2).required().messages({
    "string.min": "El nombre de la especialidad debe tener al menos {#limit} caracteres",
    "string.empty": "El nombre de la especialidad no puede estar vacío",
    "any.required": "El nombre de la especialidad es obligatorio",
  }),
  descripcion: Joi.string().trim().min(3).required().messages({
    "string.min": "La descripción debe tener al menos {#limit} caracteres",
    "string.empty": "La descripción no puede estar vacía",
    "any.required": "La descripción es obligatoria",
  }),
});

export const especialidadIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "El id debe ser hexadecimal",
    "string.length": "El id debe tener {#limit} caracteres",
    "string.empty": "El id no puede estar vacío",
    "any.required": "El id es obligatorio",
  }),
});
