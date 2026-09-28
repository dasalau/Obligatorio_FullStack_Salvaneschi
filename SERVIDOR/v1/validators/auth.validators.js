import Joi from "joi";
export const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "El usuario debe tener al menos {#limit} caracteres",
    "string.max": "El usuario no puede tener más de {#limit} caracteres",
    "string.empty": "El usuario no puede estar vacío",
    "any.required": "El usuario es obligatorio",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "La contraseña debe tener al menos {#limit} caracteres",
    "string.max": "La contraseña no puede tener más de {#limit} caracteres",
    "string.empty": "La contraseña no puede estar vacía",
    "any.required": "La contraseña es obligatoria",
  }),
});

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "El usuario debe tener al menos {#limit} caracteres",
    "string.max": "El usuario no puede tener más de {#limit} caracteres",
    "string.empty": "El usuario no puede estar vacío",
    "any.required": "El usuario es obligatorio",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "La contraseña debe tener al menos {#limit} caracteres",
    "string.max": "La contraseña no puede tener más de {#limit} caracteres",
    "string.empty": "La contraseña no puede estar vacía",
    "any.required": "La contraseña es obligatoria",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Las contraseñas no coinciden",
    "string.empty": "La confirmación de la contraseña no puede estar vacía",
    "any.required": "La confirmación de la contraseña es obligatoria",
  }),
});
