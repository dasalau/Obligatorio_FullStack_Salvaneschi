import Joi from "joi";

export const pacienteSchema = Joi.object({
  nombre: Joi.string().trim().min(2).required(),
  apellido: Joi.string().trim().min(2).required(),
  dni: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  telefono: Joi.string().required(),
  email: Joi.string().email().optional().allow(""),
});

export const pacienteIdSchema = Joi.object({
  id: Joi.string().required(),
});
