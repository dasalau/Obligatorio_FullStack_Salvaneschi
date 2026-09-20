import Joi from "joi";

export const turnoSchema = Joi.object({
  paciente: Joi.string().hex().length(24).required(),
  fecha: Joi.string().required(),
  hora: Joi.string().required(),
  motivo: Joi.string().trim().min(5).required(),
  estado: Joi.string()
    .valid("pendiente", "confirmado", "cancelado", "atendido")
    .default("pendiente"),
  especialidad: Joi.string().hex().length(24).required(),
  imagen: Joi.string().allow("").optional(),
});

export const turnoIdSchema = Joi.object({
  id: Joi.string().required(),
});
